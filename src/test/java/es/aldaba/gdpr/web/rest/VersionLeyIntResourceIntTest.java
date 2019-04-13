package es.aldaba.gdpr.web.rest;

import es.aldaba.gdpr.GdprLozanoApp;

import es.aldaba.gdpr.domain.VersionLeyInt;
import es.aldaba.gdpr.repository.VersionLeyIntRepository;
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
 * Test class for the VersionLeyIntResource REST controller.
 *
 * @see VersionLeyIntResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GdprLozanoApp.class)
public class VersionLeyIntResourceIntTest {

    private static final String DEFAULT_COD_LANGUAGE = "AAAAAAAAAA";
    private static final String UPDATED_COD_LANGUAGE = "BBBBBBBBBB";

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    @Autowired
    private VersionLeyIntRepository versionLeyIntRepository;

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

    private MockMvc restVersionLeyIntMockMvc;

    private VersionLeyInt versionLeyInt;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final VersionLeyIntResource versionLeyIntResource = new VersionLeyIntResource(versionLeyIntRepository);
        this.restVersionLeyIntMockMvc = MockMvcBuilders.standaloneSetup(versionLeyIntResource)
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
    public static VersionLeyInt createEntity(EntityManager em) {
        VersionLeyInt versionLeyInt = new VersionLeyInt()
            .codLanguage(DEFAULT_COD_LANGUAGE)
            .nombre(DEFAULT_NOMBRE)
            .descripcion(DEFAULT_DESCRIPCION);
        return versionLeyInt;
    }

    @Before
    public void initTest() {
        versionLeyInt = createEntity(em);
    }

    @Test
    @Transactional
    public void createVersionLeyInt() throws Exception {
        int databaseSizeBeforeCreate = versionLeyIntRepository.findAll().size();

        // Create the VersionLeyInt
        restVersionLeyIntMockMvc.perform(post("/api/version-ley-ints")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(versionLeyInt)))
            .andExpect(status().isCreated());

        // Validate the VersionLeyInt in the database
        List<VersionLeyInt> versionLeyIntList = versionLeyIntRepository.findAll();
        assertThat(versionLeyIntList).hasSize(databaseSizeBeforeCreate + 1);
        VersionLeyInt testVersionLeyInt = versionLeyIntList.get(versionLeyIntList.size() - 1);
        assertThat(testVersionLeyInt.getCodLanguage()).isEqualTo(DEFAULT_COD_LANGUAGE);
        assertThat(testVersionLeyInt.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testVersionLeyInt.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
    }

    @Test
    @Transactional
    public void createVersionLeyIntWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = versionLeyIntRepository.findAll().size();

        // Create the VersionLeyInt with an existing ID
        versionLeyInt.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restVersionLeyIntMockMvc.perform(post("/api/version-ley-ints")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(versionLeyInt)))
            .andExpect(status().isBadRequest());

        // Validate the VersionLeyInt in the database
        List<VersionLeyInt> versionLeyIntList = versionLeyIntRepository.findAll();
        assertThat(versionLeyIntList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllVersionLeyInts() throws Exception {
        // Initialize the database
        versionLeyIntRepository.saveAndFlush(versionLeyInt);

        // Get all the versionLeyIntList
        restVersionLeyIntMockMvc.perform(get("/api/version-ley-ints?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(versionLeyInt.getId().intValue())))
            .andExpect(jsonPath("$.[*].codLanguage").value(hasItem(DEFAULT_COD_LANGUAGE.toString())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION.toString())));
    }
    
    @Test
    @Transactional
    public void getVersionLeyInt() throws Exception {
        // Initialize the database
        versionLeyIntRepository.saveAndFlush(versionLeyInt);

        // Get the versionLeyInt
        restVersionLeyIntMockMvc.perform(get("/api/version-ley-ints/{id}", versionLeyInt.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(versionLeyInt.getId().intValue()))
            .andExpect(jsonPath("$.codLanguage").value(DEFAULT_COD_LANGUAGE.toString()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE.toString()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingVersionLeyInt() throws Exception {
        // Get the versionLeyInt
        restVersionLeyIntMockMvc.perform(get("/api/version-ley-ints/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateVersionLeyInt() throws Exception {
        // Initialize the database
        versionLeyIntRepository.saveAndFlush(versionLeyInt);

        int databaseSizeBeforeUpdate = versionLeyIntRepository.findAll().size();

        // Update the versionLeyInt
        VersionLeyInt updatedVersionLeyInt = versionLeyIntRepository.findById(versionLeyInt.getId()).get();
        // Disconnect from session so that the updates on updatedVersionLeyInt are not directly saved in db
        em.detach(updatedVersionLeyInt);
        updatedVersionLeyInt
            .codLanguage(UPDATED_COD_LANGUAGE)
            .nombre(UPDATED_NOMBRE)
            .descripcion(UPDATED_DESCRIPCION);

        restVersionLeyIntMockMvc.perform(put("/api/version-ley-ints")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedVersionLeyInt)))
            .andExpect(status().isOk());

        // Validate the VersionLeyInt in the database
        List<VersionLeyInt> versionLeyIntList = versionLeyIntRepository.findAll();
        assertThat(versionLeyIntList).hasSize(databaseSizeBeforeUpdate);
        VersionLeyInt testVersionLeyInt = versionLeyIntList.get(versionLeyIntList.size() - 1);
        assertThat(testVersionLeyInt.getCodLanguage()).isEqualTo(UPDATED_COD_LANGUAGE);
        assertThat(testVersionLeyInt.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testVersionLeyInt.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
    }

    @Test
    @Transactional
    public void updateNonExistingVersionLeyInt() throws Exception {
        int databaseSizeBeforeUpdate = versionLeyIntRepository.findAll().size();

        // Create the VersionLeyInt

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restVersionLeyIntMockMvc.perform(put("/api/version-ley-ints")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(versionLeyInt)))
            .andExpect(status().isBadRequest());

        // Validate the VersionLeyInt in the database
        List<VersionLeyInt> versionLeyIntList = versionLeyIntRepository.findAll();
        assertThat(versionLeyIntList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteVersionLeyInt() throws Exception {
        // Initialize the database
        versionLeyIntRepository.saveAndFlush(versionLeyInt);

        int databaseSizeBeforeDelete = versionLeyIntRepository.findAll().size();

        // Delete the versionLeyInt
        restVersionLeyIntMockMvc.perform(delete("/api/version-ley-ints/{id}", versionLeyInt.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<VersionLeyInt> versionLeyIntList = versionLeyIntRepository.findAll();
        assertThat(versionLeyIntList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(VersionLeyInt.class);
        VersionLeyInt versionLeyInt1 = new VersionLeyInt();
        versionLeyInt1.setId(1L);
        VersionLeyInt versionLeyInt2 = new VersionLeyInt();
        versionLeyInt2.setId(versionLeyInt1.getId());
        assertThat(versionLeyInt1).isEqualTo(versionLeyInt2);
        versionLeyInt2.setId(2L);
        assertThat(versionLeyInt1).isNotEqualTo(versionLeyInt2);
        versionLeyInt1.setId(null);
        assertThat(versionLeyInt1).isNotEqualTo(versionLeyInt2);
    }
}
