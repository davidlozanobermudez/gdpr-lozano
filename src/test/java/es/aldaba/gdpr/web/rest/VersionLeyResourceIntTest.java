package es.aldaba.gdpr.web.rest;

import es.aldaba.gdpr.GdprLozanoApp;

import es.aldaba.gdpr.domain.VersionLey;
import es.aldaba.gdpr.repository.VersionLeyRepository;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;


import static es.aldaba.gdpr.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the VersionLeyResource REST controller.
 *
 * @see VersionLeyResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GdprLozanoApp.class)
public class VersionLeyResourceIntTest {

    private static final String DEFAULT_VERSION = "AAAAAAAAAA";
    private static final String UPDATED_VERSION = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_FECHA_DESDE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_DESDE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private VersionLeyRepository versionLeyRepository;

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

    private MockMvc restVersionLeyMockMvc;

    private VersionLey versionLey;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final VersionLeyResource versionLeyResource = new VersionLeyResource(versionLeyRepository);
        this.restVersionLeyMockMvc = MockMvcBuilders.standaloneSetup(versionLeyResource)
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
    public static VersionLey createEntity(EntityManager em) {
        VersionLey versionLey = new VersionLey()
            .version(DEFAULT_VERSION)
            .fechaDesde(DEFAULT_FECHA_DESDE);
        return versionLey;
    }

    @Before
    public void initTest() {
        versionLey = createEntity(em);
    }

    @Test
    @Transactional
    public void createVersionLey() throws Exception {
        int databaseSizeBeforeCreate = versionLeyRepository.findAll().size();

        // Create the VersionLey
        restVersionLeyMockMvc.perform(post("/api/version-leys")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(versionLey)))
            .andExpect(status().isCreated());

        // Validate the VersionLey in the database
        List<VersionLey> versionLeyList = versionLeyRepository.findAll();
        assertThat(versionLeyList).hasSize(databaseSizeBeforeCreate + 1);
        VersionLey testVersionLey = versionLeyList.get(versionLeyList.size() - 1);
        assertThat(testVersionLey.getVersion()).isEqualTo(DEFAULT_VERSION);
        assertThat(testVersionLey.getFechaDesde()).isEqualTo(DEFAULT_FECHA_DESDE);
    }

    @Test
    @Transactional
    public void createVersionLeyWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = versionLeyRepository.findAll().size();

        // Create the VersionLey with an existing ID
        versionLey.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restVersionLeyMockMvc.perform(post("/api/version-leys")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(versionLey)))
            .andExpect(status().isBadRequest());

        // Validate the VersionLey in the database
        List<VersionLey> versionLeyList = versionLeyRepository.findAll();
        assertThat(versionLeyList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllVersionLeys() throws Exception {
        // Initialize the database
        versionLeyRepository.saveAndFlush(versionLey);

        // Get all the versionLeyList
        restVersionLeyMockMvc.perform(get("/api/version-leys?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(versionLey.getId().intValue())))
            .andExpect(jsonPath("$.[*].version").value(hasItem(DEFAULT_VERSION.toString())))
            .andExpect(jsonPath("$.[*].fechaDesde").value(hasItem(DEFAULT_FECHA_DESDE.toString())));
    }
    
    @Test
    @Transactional
    public void getVersionLey() throws Exception {
        // Initialize the database
        versionLeyRepository.saveAndFlush(versionLey);

        // Get the versionLey
        restVersionLeyMockMvc.perform(get("/api/version-leys/{id}", versionLey.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(versionLey.getId().intValue()))
            .andExpect(jsonPath("$.version").value(DEFAULT_VERSION.toString()))
            .andExpect(jsonPath("$.fechaDesde").value(DEFAULT_FECHA_DESDE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingVersionLey() throws Exception {
        // Get the versionLey
        restVersionLeyMockMvc.perform(get("/api/version-leys/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateVersionLey() throws Exception {
        // Initialize the database
        versionLeyRepository.saveAndFlush(versionLey);

        int databaseSizeBeforeUpdate = versionLeyRepository.findAll().size();

        // Update the versionLey
        VersionLey updatedVersionLey = versionLeyRepository.findById(versionLey.getId()).get();
        // Disconnect from session so that the updates on updatedVersionLey are not directly saved in db
        em.detach(updatedVersionLey);
        updatedVersionLey
            .version(UPDATED_VERSION)
            .fechaDesde(UPDATED_FECHA_DESDE);

        restVersionLeyMockMvc.perform(put("/api/version-leys")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedVersionLey)))
            .andExpect(status().isOk());

        // Validate the VersionLey in the database
        List<VersionLey> versionLeyList = versionLeyRepository.findAll();
        assertThat(versionLeyList).hasSize(databaseSizeBeforeUpdate);
        VersionLey testVersionLey = versionLeyList.get(versionLeyList.size() - 1);
        assertThat(testVersionLey.getVersion()).isEqualTo(UPDATED_VERSION);
        assertThat(testVersionLey.getFechaDesde()).isEqualTo(UPDATED_FECHA_DESDE);
    }

    @Test
    @Transactional
    public void updateNonExistingVersionLey() throws Exception {
        int databaseSizeBeforeUpdate = versionLeyRepository.findAll().size();

        // Create the VersionLey

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restVersionLeyMockMvc.perform(put("/api/version-leys")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(versionLey)))
            .andExpect(status().isBadRequest());

        // Validate the VersionLey in the database
        List<VersionLey> versionLeyList = versionLeyRepository.findAll();
        assertThat(versionLeyList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteVersionLey() throws Exception {
        // Initialize the database
        versionLeyRepository.saveAndFlush(versionLey);

        int databaseSizeBeforeDelete = versionLeyRepository.findAll().size();

        // Delete the versionLey
        restVersionLeyMockMvc.perform(delete("/api/version-leys/{id}", versionLey.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<VersionLey> versionLeyList = versionLeyRepository.findAll();
        assertThat(versionLeyList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(VersionLey.class);
        VersionLey versionLey1 = new VersionLey();
        versionLey1.setId(1L);
        VersionLey versionLey2 = new VersionLey();
        versionLey2.setId(versionLey1.getId());
        assertThat(versionLey1).isEqualTo(versionLey2);
        versionLey2.setId(2L);
        assertThat(versionLey1).isNotEqualTo(versionLey2);
        versionLey1.setId(null);
        assertThat(versionLey1).isNotEqualTo(versionLey2);
    }
}
