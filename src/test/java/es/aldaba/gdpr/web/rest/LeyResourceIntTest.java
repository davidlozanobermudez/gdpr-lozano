package es.aldaba.gdpr.web.rest;

import es.aldaba.gdpr.GdprLozanoApp;

import es.aldaba.gdpr.domain.Ley;
import es.aldaba.gdpr.repository.LeyRepository;
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

import es.aldaba.gdpr.domain.enumeration.Tipologia;
/**
 * Test class for the LeyResource REST controller.
 *
 * @see LeyResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GdprLozanoApp.class)
public class LeyResourceIntTest {

    private static final String DEFAULT_CODIGO = "AAAAAAAAAA";
    private static final String UPDATED_CODIGO = "BBBBBBBBBB";

    private static final Tipologia DEFAULT_TIPOLOGIA = Tipologia.REQUIERE_CONFIRMACION;
    private static final Tipologia UPDATED_TIPOLOGIA = Tipologia.NO_REQUIERE_CONFIRMACION;

    private static final Boolean DEFAULT_REQUIERE_ANONIMIZACION = false;
    private static final Boolean UPDATED_REQUIERE_ANONIMIZACION = true;

    private static final Integer DEFAULT_PLAZO_ANONIMIZADO = 1;
    private static final Integer UPDATED_PLAZO_ANONIMIZADO = 2;

    private static final Boolean DEFAULT_APLICA_A_PAIS = false;
    private static final Boolean UPDATED_APLICA_A_PAIS = true;

    private static final String DEFAULT_COD_PAIS = "AAAAAAAAAA";
    private static final String UPDATED_COD_PAIS = "BBBBBBBBBB";

    @Autowired
    private LeyRepository leyRepository;

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

    private MockMvc restLeyMockMvc;

    private Ley ley;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final LeyResource leyResource = new LeyResource(leyRepository);
        this.restLeyMockMvc = MockMvcBuilders.standaloneSetup(leyResource)
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
    public static Ley createEntity(EntityManager em) {
        Ley ley = new Ley()
            .codigo(DEFAULT_CODIGO)
            .tipologia(DEFAULT_TIPOLOGIA)
            .requiereAnonimizacion(DEFAULT_REQUIERE_ANONIMIZACION)
            .plazoAnonimizado(DEFAULT_PLAZO_ANONIMIZADO)
            .aplicaAPais(DEFAULT_APLICA_A_PAIS)
            .codPais(DEFAULT_COD_PAIS);
        return ley;
    }

    @Before
    public void initTest() {
        ley = createEntity(em);
    }

    @Test
    @Transactional
    public void createLey() throws Exception {
        int databaseSizeBeforeCreate = leyRepository.findAll().size();

        // Create the Ley
        restLeyMockMvc.perform(post("/api/leys")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ley)))
            .andExpect(status().isCreated());

        // Validate the Ley in the database
        List<Ley> leyList = leyRepository.findAll();
        assertThat(leyList).hasSize(databaseSizeBeforeCreate + 1);
        Ley testLey = leyList.get(leyList.size() - 1);
        assertThat(testLey.getCodigo()).isEqualTo(DEFAULT_CODIGO);
        assertThat(testLey.getTipologia()).isEqualTo(DEFAULT_TIPOLOGIA);
        assertThat(testLey.isRequiereAnonimizacion()).isEqualTo(DEFAULT_REQUIERE_ANONIMIZACION);
        assertThat(testLey.getPlazoAnonimizado()).isEqualTo(DEFAULT_PLAZO_ANONIMIZADO);
        assertThat(testLey.isAplicaAPais()).isEqualTo(DEFAULT_APLICA_A_PAIS);
        assertThat(testLey.getCodPais()).isEqualTo(DEFAULT_COD_PAIS);
    }

    @Test
    @Transactional
    public void createLeyWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = leyRepository.findAll().size();

        // Create the Ley with an existing ID
        ley.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLeyMockMvc.perform(post("/api/leys")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ley)))
            .andExpect(status().isBadRequest());

        // Validate the Ley in the database
        List<Ley> leyList = leyRepository.findAll();
        assertThat(leyList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllLeys() throws Exception {
        // Initialize the database
        leyRepository.saveAndFlush(ley);

        // Get all the leyList
        restLeyMockMvc.perform(get("/api/leys?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ley.getId().intValue())))
            .andExpect(jsonPath("$.[*].codigo").value(hasItem(DEFAULT_CODIGO.toString())))
            .andExpect(jsonPath("$.[*].tipologia").value(hasItem(DEFAULT_TIPOLOGIA.toString())))
            .andExpect(jsonPath("$.[*].requiereAnonimizacion").value(hasItem(DEFAULT_REQUIERE_ANONIMIZACION.booleanValue())))
            .andExpect(jsonPath("$.[*].plazoAnonimizado").value(hasItem(DEFAULT_PLAZO_ANONIMIZADO)))
            .andExpect(jsonPath("$.[*].aplicaAPais").value(hasItem(DEFAULT_APLICA_A_PAIS.booleanValue())))
            .andExpect(jsonPath("$.[*].codPais").value(hasItem(DEFAULT_COD_PAIS.toString())));
    }
    
    @Test
    @Transactional
    public void getLey() throws Exception {
        // Initialize the database
        leyRepository.saveAndFlush(ley);

        // Get the ley
        restLeyMockMvc.perform(get("/api/leys/{id}", ley.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(ley.getId().intValue()))
            .andExpect(jsonPath("$.codigo").value(DEFAULT_CODIGO.toString()))
            .andExpect(jsonPath("$.tipologia").value(DEFAULT_TIPOLOGIA.toString()))
            .andExpect(jsonPath("$.requiereAnonimizacion").value(DEFAULT_REQUIERE_ANONIMIZACION.booleanValue()))
            .andExpect(jsonPath("$.plazoAnonimizado").value(DEFAULT_PLAZO_ANONIMIZADO))
            .andExpect(jsonPath("$.aplicaAPais").value(DEFAULT_APLICA_A_PAIS.booleanValue()))
            .andExpect(jsonPath("$.codPais").value(DEFAULT_COD_PAIS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingLey() throws Exception {
        // Get the ley
        restLeyMockMvc.perform(get("/api/leys/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLey() throws Exception {
        // Initialize the database
        leyRepository.saveAndFlush(ley);

        int databaseSizeBeforeUpdate = leyRepository.findAll().size();

        // Update the ley
        Ley updatedLey = leyRepository.findById(ley.getId()).get();
        // Disconnect from session so that the updates on updatedLey are not directly saved in db
        em.detach(updatedLey);
        updatedLey
            .codigo(UPDATED_CODIGO)
            .tipologia(UPDATED_TIPOLOGIA)
            .requiereAnonimizacion(UPDATED_REQUIERE_ANONIMIZACION)
            .plazoAnonimizado(UPDATED_PLAZO_ANONIMIZADO)
            .aplicaAPais(UPDATED_APLICA_A_PAIS)
            .codPais(UPDATED_COD_PAIS);

        restLeyMockMvc.perform(put("/api/leys")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedLey)))
            .andExpect(status().isOk());

        // Validate the Ley in the database
        List<Ley> leyList = leyRepository.findAll();
        assertThat(leyList).hasSize(databaseSizeBeforeUpdate);
        Ley testLey = leyList.get(leyList.size() - 1);
        assertThat(testLey.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testLey.getTipologia()).isEqualTo(UPDATED_TIPOLOGIA);
        assertThat(testLey.isRequiereAnonimizacion()).isEqualTo(UPDATED_REQUIERE_ANONIMIZACION);
        assertThat(testLey.getPlazoAnonimizado()).isEqualTo(UPDATED_PLAZO_ANONIMIZADO);
        assertThat(testLey.isAplicaAPais()).isEqualTo(UPDATED_APLICA_A_PAIS);
        assertThat(testLey.getCodPais()).isEqualTo(UPDATED_COD_PAIS);
    }

    @Test
    @Transactional
    public void updateNonExistingLey() throws Exception {
        int databaseSizeBeforeUpdate = leyRepository.findAll().size();

        // Create the Ley

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLeyMockMvc.perform(put("/api/leys")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ley)))
            .andExpect(status().isBadRequest());

        // Validate the Ley in the database
        List<Ley> leyList = leyRepository.findAll();
        assertThat(leyList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteLey() throws Exception {
        // Initialize the database
        leyRepository.saveAndFlush(ley);

        int databaseSizeBeforeDelete = leyRepository.findAll().size();

        // Delete the ley
        restLeyMockMvc.perform(delete("/api/leys/{id}", ley.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Ley> leyList = leyRepository.findAll();
        assertThat(leyList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Ley.class);
        Ley ley1 = new Ley();
        ley1.setId(1L);
        Ley ley2 = new Ley();
        ley2.setId(ley1.getId());
        assertThat(ley1).isEqualTo(ley2);
        ley2.setId(2L);
        assertThat(ley1).isNotEqualTo(ley2);
        ley1.setId(null);
        assertThat(ley1).isNotEqualTo(ley2);
    }
}
