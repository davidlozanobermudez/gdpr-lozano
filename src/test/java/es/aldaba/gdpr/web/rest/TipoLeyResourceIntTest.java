package es.aldaba.gdpr.web.rest;

import es.aldaba.gdpr.GdprLozanoApp;

import es.aldaba.gdpr.domain.TipoLey;
import es.aldaba.gdpr.repository.TipoLeyRepository;
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
 * Test class for the TipoLeyResource REST controller.
 *
 * @see TipoLeyResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GdprLozanoApp.class)
public class TipoLeyResourceIntTest {

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    @Autowired
    private TipoLeyRepository tipoLeyRepository;

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

    private MockMvc restTipoLeyMockMvc;

    private TipoLey tipoLey;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TipoLeyResource tipoLeyResource = new TipoLeyResource(tipoLeyRepository);
        this.restTipoLeyMockMvc = MockMvcBuilders.standaloneSetup(tipoLeyResource)
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
    public static TipoLey createEntity(EntityManager em) {
        TipoLey tipoLey = new TipoLey()
            .descripcion(DEFAULT_DESCRIPCION);
        return tipoLey;
    }

    @Before
    public void initTest() {
        tipoLey = createEntity(em);
    }

    @Test
    @Transactional
    public void createTipoLey() throws Exception {
        int databaseSizeBeforeCreate = tipoLeyRepository.findAll().size();

        // Create the TipoLey
        restTipoLeyMockMvc.perform(post("/api/tipolies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoLey)))
            .andExpect(status().isCreated());

        // Validate the TipoLey in the database
        List<TipoLey> tipoLeyList = tipoLeyRepository.findAll();
        assertThat(tipoLeyList).hasSize(databaseSizeBeforeCreate + 1);
        TipoLey testTipoLey = tipoLeyList.get(tipoLeyList.size() - 1);
        assertThat(testTipoLey.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
    }

    @Test
    @Transactional
    public void createTipoLeyWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tipoLeyRepository.findAll().size();

        // Create the TipoLey with an existing ID
        tipoLey.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTipoLeyMockMvc.perform(post("/api/tipolies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoLey)))
            .andExpect(status().isBadRequest());

        // Validate the TipoLey in the database
        List<TipoLey> tipoLeyList = tipoLeyRepository.findAll();
        assertThat(tipoLeyList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTipolies() throws Exception {
        // Initialize the database
        tipoLeyRepository.saveAndFlush(tipoLey);

        // Get all the tipoLeyList
        restTipoLeyMockMvc.perform(get("/api/tipolies?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tipoLey.getId().intValue())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION.toString())));
    }
    
    @Test
    @Transactional
    public void getTipoLey() throws Exception {
        // Initialize the database
        tipoLeyRepository.saveAndFlush(tipoLey);

        // Get the tipoLey
        restTipoLeyMockMvc.perform(get("/api/tipolies/{id}", tipoLey.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tipoLey.getId().intValue()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTipoLey() throws Exception {
        // Get the tipoLey
        restTipoLeyMockMvc.perform(get("/api/tipolies/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTipoLey() throws Exception {
        // Initialize the database
        tipoLeyRepository.saveAndFlush(tipoLey);

        int databaseSizeBeforeUpdate = tipoLeyRepository.findAll().size();

        // Update the tipoLey
        TipoLey updatedTipoLey = tipoLeyRepository.findById(tipoLey.getId()).get();
        // Disconnect from session so that the updates on updatedTipoLey are not directly saved in db
        em.detach(updatedTipoLey);
        updatedTipoLey
            .descripcion(UPDATED_DESCRIPCION);

        restTipoLeyMockMvc.perform(put("/api/tipolies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTipoLey)))
            .andExpect(status().isOk());

        // Validate the TipoLey in the database
        List<TipoLey> tipoLeyList = tipoLeyRepository.findAll();
        assertThat(tipoLeyList).hasSize(databaseSizeBeforeUpdate);
        TipoLey testTipoLey = tipoLeyList.get(tipoLeyList.size() - 1);
        assertThat(testTipoLey.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
    }

    @Test
    @Transactional
    public void updateNonExistingTipoLey() throws Exception {
        int databaseSizeBeforeUpdate = tipoLeyRepository.findAll().size();

        // Create the TipoLey

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTipoLeyMockMvc.perform(put("/api/tipolies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoLey)))
            .andExpect(status().isBadRequest());

        // Validate the TipoLey in the database
        List<TipoLey> tipoLeyList = tipoLeyRepository.findAll();
        assertThat(tipoLeyList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTipoLey() throws Exception {
        // Initialize the database
        tipoLeyRepository.saveAndFlush(tipoLey);

        int databaseSizeBeforeDelete = tipoLeyRepository.findAll().size();

        // Delete the tipoLey
        restTipoLeyMockMvc.perform(delete("/api/tipolies/{id}", tipoLey.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TipoLey> tipoLeyList = tipoLeyRepository.findAll();
        assertThat(tipoLeyList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TipoLey.class);
        TipoLey tipoLey1 = new TipoLey();
        tipoLey1.setId(1L);
        TipoLey tipoLey2 = new TipoLey();
        tipoLey2.setId(tipoLey1.getId());
        assertThat(tipoLey1).isEqualTo(tipoLey2);
        tipoLey2.setId(2L);
        assertThat(tipoLey1).isNotEqualTo(tipoLey2);
        tipoLey1.setId(null);
        assertThat(tipoLey1).isNotEqualTo(tipoLey2);
    }
}
