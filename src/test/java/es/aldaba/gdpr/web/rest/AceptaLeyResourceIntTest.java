package es.aldaba.gdpr.web.rest;

import es.aldaba.gdpr.GdprLozanoApp;

import es.aldaba.gdpr.domain.AceptaLey;
import es.aldaba.gdpr.repository.AceptaLeyRepository;
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
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;


import static es.aldaba.gdpr.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the AceptaLeyResource REST controller.
 *
 * @see AceptaLeyResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GdprLozanoApp.class)
public class AceptaLeyResourceIntTest {

    private static final Boolean DEFAULT_ENVIADA = false;
    private static final Boolean UPDATED_ENVIADA = true;

    private static final Instant DEFAULT_FECHA_ENVIO = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FECHA_ENVIO = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Boolean DEFAULT_ACEPTADA = false;
    private static final Boolean UPDATED_ACEPTADA = true;

    private static final Instant DEFAULT_FECHA_ACEPTACION = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FECHA_ACEPTACION = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private AceptaLeyRepository aceptaLeyRepository;

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

    private MockMvc restAceptaLeyMockMvc;

    private AceptaLey aceptaLey;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AceptaLeyResource aceptaLeyResource = new AceptaLeyResource(aceptaLeyRepository);
        this.restAceptaLeyMockMvc = MockMvcBuilders.standaloneSetup(aceptaLeyResource)
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
    public static AceptaLey createEntity(EntityManager em) {
        AceptaLey aceptaLey = new AceptaLey()
            .enviada(DEFAULT_ENVIADA)
            .fechaEnvio(DEFAULT_FECHA_ENVIO)
            .aceptada(DEFAULT_ACEPTADA)
            .fechaAceptacion(DEFAULT_FECHA_ACEPTACION);
        return aceptaLey;
    }

    @Before
    public void initTest() {
        aceptaLey = createEntity(em);
    }

    @Test
    @Transactional
    public void createAceptaLey() throws Exception {
        int databaseSizeBeforeCreate = aceptaLeyRepository.findAll().size();

        // Create the AceptaLey
        restAceptaLeyMockMvc.perform(post("/api/acepta-leys")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(aceptaLey)))
            .andExpect(status().isCreated());

        // Validate the AceptaLey in the database
        List<AceptaLey> aceptaLeyList = aceptaLeyRepository.findAll();
        assertThat(aceptaLeyList).hasSize(databaseSizeBeforeCreate + 1);
        AceptaLey testAceptaLey = aceptaLeyList.get(aceptaLeyList.size() - 1);
        assertThat(testAceptaLey.isEnviada()).isEqualTo(DEFAULT_ENVIADA);
        assertThat(testAceptaLey.getFechaEnvio()).isEqualTo(DEFAULT_FECHA_ENVIO);
        assertThat(testAceptaLey.isAceptada()).isEqualTo(DEFAULT_ACEPTADA);
        assertThat(testAceptaLey.getFechaAceptacion()).isEqualTo(DEFAULT_FECHA_ACEPTACION);
    }

    @Test
    @Transactional
    public void createAceptaLeyWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = aceptaLeyRepository.findAll().size();

        // Create the AceptaLey with an existing ID
        aceptaLey.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAceptaLeyMockMvc.perform(post("/api/acepta-leys")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(aceptaLey)))
            .andExpect(status().isBadRequest());

        // Validate the AceptaLey in the database
        List<AceptaLey> aceptaLeyList = aceptaLeyRepository.findAll();
        assertThat(aceptaLeyList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkEnviadaIsRequired() throws Exception {
        int databaseSizeBeforeTest = aceptaLeyRepository.findAll().size();
        // set the field null
        aceptaLey.setEnviada(null);

        // Create the AceptaLey, which fails.

        restAceptaLeyMockMvc.perform(post("/api/acepta-leys")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(aceptaLey)))
            .andExpect(status().isBadRequest());

        List<AceptaLey> aceptaLeyList = aceptaLeyRepository.findAll();
        assertThat(aceptaLeyList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllAceptaLeys() throws Exception {
        // Initialize the database
        aceptaLeyRepository.saveAndFlush(aceptaLey);

        // Get all the aceptaLeyList
        restAceptaLeyMockMvc.perform(get("/api/acepta-leys?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(aceptaLey.getId().intValue())))
            .andExpect(jsonPath("$.[*].enviada").value(hasItem(DEFAULT_ENVIADA.booleanValue())))
            .andExpect(jsonPath("$.[*].fechaEnvio").value(hasItem(DEFAULT_FECHA_ENVIO.toString())))
            .andExpect(jsonPath("$.[*].aceptada").value(hasItem(DEFAULT_ACEPTADA.booleanValue())))
            .andExpect(jsonPath("$.[*].fechaAceptacion").value(hasItem(DEFAULT_FECHA_ACEPTACION.toString())));
    }
    
    @Test
    @Transactional
    public void getAceptaLey() throws Exception {
        // Initialize the database
        aceptaLeyRepository.saveAndFlush(aceptaLey);

        // Get the aceptaLey
        restAceptaLeyMockMvc.perform(get("/api/acepta-leys/{id}", aceptaLey.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(aceptaLey.getId().intValue()))
            .andExpect(jsonPath("$.enviada").value(DEFAULT_ENVIADA.booleanValue()))
            .andExpect(jsonPath("$.fechaEnvio").value(DEFAULT_FECHA_ENVIO.toString()))
            .andExpect(jsonPath("$.aceptada").value(DEFAULT_ACEPTADA.booleanValue()))
            .andExpect(jsonPath("$.fechaAceptacion").value(DEFAULT_FECHA_ACEPTACION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAceptaLey() throws Exception {
        // Get the aceptaLey
        restAceptaLeyMockMvc.perform(get("/api/acepta-leys/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAceptaLey() throws Exception {
        // Initialize the database
        aceptaLeyRepository.saveAndFlush(aceptaLey);

        int databaseSizeBeforeUpdate = aceptaLeyRepository.findAll().size();

        // Update the aceptaLey
        AceptaLey updatedAceptaLey = aceptaLeyRepository.findById(aceptaLey.getId()).get();
        // Disconnect from session so that the updates on updatedAceptaLey are not directly saved in db
        em.detach(updatedAceptaLey);
        updatedAceptaLey
            .enviada(UPDATED_ENVIADA)
            .fechaEnvio(UPDATED_FECHA_ENVIO)
            .aceptada(UPDATED_ACEPTADA)
            .fechaAceptacion(UPDATED_FECHA_ACEPTACION);

        restAceptaLeyMockMvc.perform(put("/api/acepta-leys")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAceptaLey)))
            .andExpect(status().isOk());

        // Validate the AceptaLey in the database
        List<AceptaLey> aceptaLeyList = aceptaLeyRepository.findAll();
        assertThat(aceptaLeyList).hasSize(databaseSizeBeforeUpdate);
        AceptaLey testAceptaLey = aceptaLeyList.get(aceptaLeyList.size() - 1);
        assertThat(testAceptaLey.isEnviada()).isEqualTo(UPDATED_ENVIADA);
        assertThat(testAceptaLey.getFechaEnvio()).isEqualTo(UPDATED_FECHA_ENVIO);
        assertThat(testAceptaLey.isAceptada()).isEqualTo(UPDATED_ACEPTADA);
        assertThat(testAceptaLey.getFechaAceptacion()).isEqualTo(UPDATED_FECHA_ACEPTACION);
    }

    @Test
    @Transactional
    public void updateNonExistingAceptaLey() throws Exception {
        int databaseSizeBeforeUpdate = aceptaLeyRepository.findAll().size();

        // Create the AceptaLey

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAceptaLeyMockMvc.perform(put("/api/acepta-leys")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(aceptaLey)))
            .andExpect(status().isBadRequest());

        // Validate the AceptaLey in the database
        List<AceptaLey> aceptaLeyList = aceptaLeyRepository.findAll();
        assertThat(aceptaLeyList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAceptaLey() throws Exception {
        // Initialize the database
        aceptaLeyRepository.saveAndFlush(aceptaLey);

        int databaseSizeBeforeDelete = aceptaLeyRepository.findAll().size();

        // Delete the aceptaLey
        restAceptaLeyMockMvc.perform(delete("/api/acepta-leys/{id}", aceptaLey.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<AceptaLey> aceptaLeyList = aceptaLeyRepository.findAll();
        assertThat(aceptaLeyList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AceptaLey.class);
        AceptaLey aceptaLey1 = new AceptaLey();
        aceptaLey1.setId(1L);
        AceptaLey aceptaLey2 = new AceptaLey();
        aceptaLey2.setId(aceptaLey1.getId());
        assertThat(aceptaLey1).isEqualTo(aceptaLey2);
        aceptaLey2.setId(2L);
        assertThat(aceptaLey1).isNotEqualTo(aceptaLey2);
        aceptaLey1.setId(null);
        assertThat(aceptaLey1).isNotEqualTo(aceptaLey2);
    }
}
