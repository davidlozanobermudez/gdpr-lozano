package es.aldaba.gdpr.web.rest;

import es.aldaba.gdpr.GdprLozanoApp;

import es.aldaba.gdpr.domain.SubscripcionInt;
import es.aldaba.gdpr.repository.SubscripcionIntRepository;
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
 * Test class for the SubscripcionIntResource REST controller.
 *
 * @see SubscripcionIntResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GdprLozanoApp.class)
public class SubscripcionIntResourceIntTest {

    private static final String DEFAULT_COD_LANGUAGE = "AAAAAAAAAA";
    private static final String UPDATED_COD_LANGUAGE = "BBBBBBBBBB";

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    @Autowired
    private SubscripcionIntRepository subscripcionIntRepository;

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

    private MockMvc restSubscripcionIntMockMvc;

    private SubscripcionInt subscripcionInt;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SubscripcionIntResource subscripcionIntResource = new SubscripcionIntResource(subscripcionIntRepository);
        this.restSubscripcionIntMockMvc = MockMvcBuilders.standaloneSetup(subscripcionIntResource)
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
    public static SubscripcionInt createEntity(EntityManager em) {
        SubscripcionInt subscripcionInt = new SubscripcionInt()
            .codLanguage(DEFAULT_COD_LANGUAGE)
            .nombre(DEFAULT_NOMBRE)
            .descripcion(DEFAULT_DESCRIPCION);
        return subscripcionInt;
    }

    @Before
    public void initTest() {
        subscripcionInt = createEntity(em);
    }

    @Test
    @Transactional
    public void createSubscripcionInt() throws Exception {
        int databaseSizeBeforeCreate = subscripcionIntRepository.findAll().size();

        // Create the SubscripcionInt
        restSubscripcionIntMockMvc.perform(post("/api/subscripcion-ints")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subscripcionInt)))
            .andExpect(status().isCreated());

        // Validate the SubscripcionInt in the database
        List<SubscripcionInt> subscripcionIntList = subscripcionIntRepository.findAll();
        assertThat(subscripcionIntList).hasSize(databaseSizeBeforeCreate + 1);
        SubscripcionInt testSubscripcionInt = subscripcionIntList.get(subscripcionIntList.size() - 1);
        assertThat(testSubscripcionInt.getCodLanguage()).isEqualTo(DEFAULT_COD_LANGUAGE);
        assertThat(testSubscripcionInt.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testSubscripcionInt.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
    }

    @Test
    @Transactional
    public void createSubscripcionIntWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = subscripcionIntRepository.findAll().size();

        // Create the SubscripcionInt with an existing ID
        subscripcionInt.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSubscripcionIntMockMvc.perform(post("/api/subscripcion-ints")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subscripcionInt)))
            .andExpect(status().isBadRequest());

        // Validate the SubscripcionInt in the database
        List<SubscripcionInt> subscripcionIntList = subscripcionIntRepository.findAll();
        assertThat(subscripcionIntList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllSubscripcionInts() throws Exception {
        // Initialize the database
        subscripcionIntRepository.saveAndFlush(subscripcionInt);

        // Get all the subscripcionIntList
        restSubscripcionIntMockMvc.perform(get("/api/subscripcion-ints?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(subscripcionInt.getId().intValue())))
            .andExpect(jsonPath("$.[*].codLanguage").value(hasItem(DEFAULT_COD_LANGUAGE.toString())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION.toString())));
    }
    
    @Test
    @Transactional
    public void getSubscripcionInt() throws Exception {
        // Initialize the database
        subscripcionIntRepository.saveAndFlush(subscripcionInt);

        // Get the subscripcionInt
        restSubscripcionIntMockMvc.perform(get("/api/subscripcion-ints/{id}", subscripcionInt.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(subscripcionInt.getId().intValue()))
            .andExpect(jsonPath("$.codLanguage").value(DEFAULT_COD_LANGUAGE.toString()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE.toString()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSubscripcionInt() throws Exception {
        // Get the subscripcionInt
        restSubscripcionIntMockMvc.perform(get("/api/subscripcion-ints/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSubscripcionInt() throws Exception {
        // Initialize the database
        subscripcionIntRepository.saveAndFlush(subscripcionInt);

        int databaseSizeBeforeUpdate = subscripcionIntRepository.findAll().size();

        // Update the subscripcionInt
        SubscripcionInt updatedSubscripcionInt = subscripcionIntRepository.findById(subscripcionInt.getId()).get();
        // Disconnect from session so that the updates on updatedSubscripcionInt are not directly saved in db
        em.detach(updatedSubscripcionInt);
        updatedSubscripcionInt
            .codLanguage(UPDATED_COD_LANGUAGE)
            .nombre(UPDATED_NOMBRE)
            .descripcion(UPDATED_DESCRIPCION);

        restSubscripcionIntMockMvc.perform(put("/api/subscripcion-ints")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSubscripcionInt)))
            .andExpect(status().isOk());

        // Validate the SubscripcionInt in the database
        List<SubscripcionInt> subscripcionIntList = subscripcionIntRepository.findAll();
        assertThat(subscripcionIntList).hasSize(databaseSizeBeforeUpdate);
        SubscripcionInt testSubscripcionInt = subscripcionIntList.get(subscripcionIntList.size() - 1);
        assertThat(testSubscripcionInt.getCodLanguage()).isEqualTo(UPDATED_COD_LANGUAGE);
        assertThat(testSubscripcionInt.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testSubscripcionInt.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
    }

    @Test
    @Transactional
    public void updateNonExistingSubscripcionInt() throws Exception {
        int databaseSizeBeforeUpdate = subscripcionIntRepository.findAll().size();

        // Create the SubscripcionInt

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSubscripcionIntMockMvc.perform(put("/api/subscripcion-ints")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subscripcionInt)))
            .andExpect(status().isBadRequest());

        // Validate the SubscripcionInt in the database
        List<SubscripcionInt> subscripcionIntList = subscripcionIntRepository.findAll();
        assertThat(subscripcionIntList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSubscripcionInt() throws Exception {
        // Initialize the database
        subscripcionIntRepository.saveAndFlush(subscripcionInt);

        int databaseSizeBeforeDelete = subscripcionIntRepository.findAll().size();

        // Delete the subscripcionInt
        restSubscripcionIntMockMvc.perform(delete("/api/subscripcion-ints/{id}", subscripcionInt.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<SubscripcionInt> subscripcionIntList = subscripcionIntRepository.findAll();
        assertThat(subscripcionIntList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SubscripcionInt.class);
        SubscripcionInt subscripcionInt1 = new SubscripcionInt();
        subscripcionInt1.setId(1L);
        SubscripcionInt subscripcionInt2 = new SubscripcionInt();
        subscripcionInt2.setId(subscripcionInt1.getId());
        assertThat(subscripcionInt1).isEqualTo(subscripcionInt2);
        subscripcionInt2.setId(2L);
        assertThat(subscripcionInt1).isNotEqualTo(subscripcionInt2);
        subscripcionInt1.setId(null);
        assertThat(subscripcionInt1).isNotEqualTo(subscripcionInt2);
    }
}
