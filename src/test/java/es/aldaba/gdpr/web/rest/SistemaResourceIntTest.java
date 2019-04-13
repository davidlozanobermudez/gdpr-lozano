package es.aldaba.gdpr.web.rest;

import es.aldaba.gdpr.GdprLozanoApp;

import es.aldaba.gdpr.domain.Sistema;
import es.aldaba.gdpr.repository.SistemaRepository;
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
 * Test class for the SistemaResource REST controller.
 *
 * @see SistemaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GdprLozanoApp.class)
public class SistemaResourceIntTest {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    @Autowired
    private SistemaRepository sistemaRepository;

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

    private MockMvc restSistemaMockMvc;

    private Sistema sistema;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SistemaResource sistemaResource = new SistemaResource(sistemaRepository);
        this.restSistemaMockMvc = MockMvcBuilders.standaloneSetup(sistemaResource)
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
    public static Sistema createEntity(EntityManager em) {
        Sistema sistema = new Sistema()
            .nombre(DEFAULT_NOMBRE);
        return sistema;
    }

    @Before
    public void initTest() {
        sistema = createEntity(em);
    }

    @Test
    @Transactional
    public void createSistema() throws Exception {
        int databaseSizeBeforeCreate = sistemaRepository.findAll().size();

        // Create the Sistema
        restSistemaMockMvc.perform(post("/api/sistemas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sistema)))
            .andExpect(status().isCreated());

        // Validate the Sistema in the database
        List<Sistema> sistemaList = sistemaRepository.findAll();
        assertThat(sistemaList).hasSize(databaseSizeBeforeCreate + 1);
        Sistema testSistema = sistemaList.get(sistemaList.size() - 1);
        assertThat(testSistema.getNombre()).isEqualTo(DEFAULT_NOMBRE);
    }

    @Test
    @Transactional
    public void createSistemaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = sistemaRepository.findAll().size();

        // Create the Sistema with an existing ID
        sistema.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSistemaMockMvc.perform(post("/api/sistemas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sistema)))
            .andExpect(status().isBadRequest());

        // Validate the Sistema in the database
        List<Sistema> sistemaList = sistemaRepository.findAll();
        assertThat(sistemaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllSistemas() throws Exception {
        // Initialize the database
        sistemaRepository.saveAndFlush(sistema);

        // Get all the sistemaList
        restSistemaMockMvc.perform(get("/api/sistemas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(sistema.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())));
    }
    
    @Test
    @Transactional
    public void getSistema() throws Exception {
        // Initialize the database
        sistemaRepository.saveAndFlush(sistema);

        // Get the sistema
        restSistemaMockMvc.perform(get("/api/sistemas/{id}", sistema.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(sistema.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSistema() throws Exception {
        // Get the sistema
        restSistemaMockMvc.perform(get("/api/sistemas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSistema() throws Exception {
        // Initialize the database
        sistemaRepository.saveAndFlush(sistema);

        int databaseSizeBeforeUpdate = sistemaRepository.findAll().size();

        // Update the sistema
        Sistema updatedSistema = sistemaRepository.findById(sistema.getId()).get();
        // Disconnect from session so that the updates on updatedSistema are not directly saved in db
        em.detach(updatedSistema);
        updatedSistema
            .nombre(UPDATED_NOMBRE);

        restSistemaMockMvc.perform(put("/api/sistemas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSistema)))
            .andExpect(status().isOk());

        // Validate the Sistema in the database
        List<Sistema> sistemaList = sistemaRepository.findAll();
        assertThat(sistemaList).hasSize(databaseSizeBeforeUpdate);
        Sistema testSistema = sistemaList.get(sistemaList.size() - 1);
        assertThat(testSistema.getNombre()).isEqualTo(UPDATED_NOMBRE);
    }

    @Test
    @Transactional
    public void updateNonExistingSistema() throws Exception {
        int databaseSizeBeforeUpdate = sistemaRepository.findAll().size();

        // Create the Sistema

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSistemaMockMvc.perform(put("/api/sistemas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sistema)))
            .andExpect(status().isBadRequest());

        // Validate the Sistema in the database
        List<Sistema> sistemaList = sistemaRepository.findAll();
        assertThat(sistemaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSistema() throws Exception {
        // Initialize the database
        sistemaRepository.saveAndFlush(sistema);

        int databaseSizeBeforeDelete = sistemaRepository.findAll().size();

        // Delete the sistema
        restSistemaMockMvc.perform(delete("/api/sistemas/{id}", sistema.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Sistema> sistemaList = sistemaRepository.findAll();
        assertThat(sistemaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Sistema.class);
        Sistema sistema1 = new Sistema();
        sistema1.setId(1L);
        Sistema sistema2 = new Sistema();
        sistema2.setId(sistema1.getId());
        assertThat(sistema1).isEqualTo(sistema2);
        sistema2.setId(2L);
        assertThat(sistema1).isNotEqualTo(sistema2);
        sistema1.setId(null);
        assertThat(sistema1).isNotEqualTo(sistema2);
    }
}
