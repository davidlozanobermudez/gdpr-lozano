package es.aldaba.gdpr.web.rest;

import es.aldaba.gdpr.GdprLozanoApp;

import es.aldaba.gdpr.domain.Subscripcion;
import es.aldaba.gdpr.repository.SubscripcionRepository;
import es.aldaba.gdpr.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;


import static es.aldaba.gdpr.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the SubscripcionResource REST controller.
 *
 * @see SubscripcionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GdprLozanoApp.class)
public class SubscripcionResourceIntTest {

    private static final String DEFAULT_CODIGO = "AAAAAAAAAA";
    private static final String UPDATED_CODIGO = "BBBBBBBBBB";

    @Autowired
    private SubscripcionRepository subscripcionRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restSubscripcionMockMvc;

    private Subscripcion subscripcion;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SubscripcionResource subscripcionResource = new SubscripcionResource(subscripcionRepository);
        this.restSubscripcionMockMvc = MockMvcBuilders.standaloneSetup(subscripcionResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Subscripcion createEntity(EntityManager em) {
        Subscripcion subscripcion = new Subscripcion()
            .codigo(DEFAULT_CODIGO);
        return subscripcion;
    }

    @Before
    public void initTest() {
        subscripcion = createEntity(em);
    }

    @Test
    @Transactional
    public void createSubscripcion() throws Exception {
        int databaseSizeBeforeCreate = subscripcionRepository.findAll().size();

        // Create the Subscripcion
        restSubscripcionMockMvc.perform(post("/api/subscripcions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subscripcion)))
            .andExpect(status().isCreated());

        // Validate the Subscripcion in the database
        List<Subscripcion> subscripcionList = subscripcionRepository.findAll();
        assertThat(subscripcionList).hasSize(databaseSizeBeforeCreate + 1);
        Subscripcion testSubscripcion = subscripcionList.get(subscripcionList.size() - 1);
        assertThat(testSubscripcion.getCodigo()).isEqualTo(DEFAULT_CODIGO);
    }

    @Test
    @Transactional
    public void createSubscripcionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = subscripcionRepository.findAll().size();

        // Create the Subscripcion with an existing ID
        subscripcion.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSubscripcionMockMvc.perform(post("/api/subscripcions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subscripcion)))
            .andExpect(status().isBadRequest());

        // Validate the Subscripcion in the database
        List<Subscripcion> subscripcionList = subscripcionRepository.findAll();
        assertThat(subscripcionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllSubscripcions() throws Exception {
        // Initialize the database
        subscripcionRepository.saveAndFlush(subscripcion);

        // Get all the subscripcionList
        restSubscripcionMockMvc.perform(get("/api/subscripcions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(subscripcion.getId().intValue())))
            .andExpect(jsonPath("$.[*].codigo").value(hasItem(DEFAULT_CODIGO.toString())));
    }
    
    @Test
    @Transactional
    public void getSubscripcion() throws Exception {
        // Initialize the database
        subscripcionRepository.saveAndFlush(subscripcion);

        // Get the subscripcion
        restSubscripcionMockMvc.perform(get("/api/subscripcions/{id}", subscripcion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(subscripcion.getId().intValue()))
            .andExpect(jsonPath("$.codigo").value(DEFAULT_CODIGO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSubscripcion() throws Exception {
        // Get the subscripcion
        restSubscripcionMockMvc.perform(get("/api/subscripcions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSubscripcion() throws Exception {
        // Initialize the database
        subscripcionRepository.saveAndFlush(subscripcion);

        int databaseSizeBeforeUpdate = subscripcionRepository.findAll().size();

        // Update the subscripcion
        Subscripcion updatedSubscripcion = subscripcionRepository.findById(subscripcion.getId()).get();
        // Disconnect from session so that the updates on updatedSubscripcion are not directly saved in db
        em.detach(updatedSubscripcion);
        updatedSubscripcion
            .codigo(UPDATED_CODIGO);

        restSubscripcionMockMvc.perform(put("/api/subscripcions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSubscripcion)))
            .andExpect(status().isOk());

        // Validate the Subscripcion in the database
        List<Subscripcion> subscripcionList = subscripcionRepository.findAll();
        assertThat(subscripcionList).hasSize(databaseSizeBeforeUpdate);
        Subscripcion testSubscripcion = subscripcionList.get(subscripcionList.size() - 1);
        assertThat(testSubscripcion.getCodigo()).isEqualTo(UPDATED_CODIGO);
    }

    @Test
    @Transactional
    public void updateNonExistingSubscripcion() throws Exception {
        int databaseSizeBeforeUpdate = subscripcionRepository.findAll().size();

        // Create the Subscripcion

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSubscripcionMockMvc.perform(put("/api/subscripcions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subscripcion)))
            .andExpect(status().isBadRequest());

        // Validate the Subscripcion in the database
        List<Subscripcion> subscripcionList = subscripcionRepository.findAll();
        assertThat(subscripcionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSubscripcion() throws Exception {
        // Initialize the database
        subscripcionRepository.saveAndFlush(subscripcion);

        int databaseSizeBeforeDelete = subscripcionRepository.findAll().size();

        // Delete the subscripcion
        restSubscripcionMockMvc.perform(delete("/api/subscripcions/{id}", subscripcion.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Subscripcion> subscripcionList = subscripcionRepository.findAll();
        assertThat(subscripcionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Subscripcion.class);
        Subscripcion subscripcion1 = new Subscripcion();
        subscripcion1.setId(1L);
        Subscripcion subscripcion2 = new Subscripcion();
        subscripcion2.setId(subscripcion1.getId());
        assertThat(subscripcion1).isEqualTo(subscripcion2);
        subscripcion2.setId(2L);
        assertThat(subscripcion1).isNotEqualTo(subscripcion2);
        subscripcion1.setId(null);
        assertThat(subscripcion1).isNotEqualTo(subscripcion2);
    }
}
