package es.aldaba.gdpr.web.rest;

import es.aldaba.gdpr.GdprLozanoApp;

import es.aldaba.gdpr.domain.Operacion;
import es.aldaba.gdpr.repository.OperacionRepository;
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

import es.aldaba.gdpr.domain.enumeration.TipoOperacion;
/**
 * Test class for the OperacionResource REST controller.
 *
 * @see OperacionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GdprLozanoApp.class)
public class OperacionResourceIntTest {

    private static final String DEFAULT_CODIGO = "AAAAAAAAAA";
    private static final String UPDATED_CODIGO = "BBBBBBBBBB";

    private static final String DEFAULT_WS_ASOCIADO = "AAAAAAAAAA";
    private static final String UPDATED_WS_ASOCIADO = "BBBBBBBBBB";

    private static final TipoOperacion DEFAULT_TIPO = TipoOperacion.GET;
    private static final TipoOperacion UPDATED_TIPO = TipoOperacion.POST;

    @Autowired
    private OperacionRepository operacionRepository;

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

    private MockMvc restOperacionMockMvc;

    private Operacion operacion;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final OperacionResource operacionResource = new OperacionResource(operacionRepository);
        this.restOperacionMockMvc = MockMvcBuilders.standaloneSetup(operacionResource)
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
    public static Operacion createEntity(EntityManager em) {
        Operacion operacion = new Operacion()
            .codigo(DEFAULT_CODIGO)
            .wsAsociado(DEFAULT_WS_ASOCIADO)
            .tipo(DEFAULT_TIPO);
        return operacion;
    }

    @Before
    public void initTest() {
        operacion = createEntity(em);
    }

    @Test
    @Transactional
    public void createOperacion() throws Exception {
        int databaseSizeBeforeCreate = operacionRepository.findAll().size();

        // Create the Operacion
        restOperacionMockMvc.perform(post("/api/operacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(operacion)))
            .andExpect(status().isCreated());

        // Validate the Operacion in the database
        List<Operacion> operacionList = operacionRepository.findAll();
        assertThat(operacionList).hasSize(databaseSizeBeforeCreate + 1);
        Operacion testOperacion = operacionList.get(operacionList.size() - 1);
        assertThat(testOperacion.getCodigo()).isEqualTo(DEFAULT_CODIGO);
        assertThat(testOperacion.getWsAsociado()).isEqualTo(DEFAULT_WS_ASOCIADO);
        assertThat(testOperacion.getTipo()).isEqualTo(DEFAULT_TIPO);
    }

    @Test
    @Transactional
    public void createOperacionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = operacionRepository.findAll().size();

        // Create the Operacion with an existing ID
        operacion.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restOperacionMockMvc.perform(post("/api/operacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(operacion)))
            .andExpect(status().isBadRequest());

        // Validate the Operacion in the database
        List<Operacion> operacionList = operacionRepository.findAll();
        assertThat(operacionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllOperacions() throws Exception {
        // Initialize the database
        operacionRepository.saveAndFlush(operacion);

        // Get all the operacionList
        restOperacionMockMvc.perform(get("/api/operacions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(operacion.getId().intValue())))
            .andExpect(jsonPath("$.[*].codigo").value(hasItem(DEFAULT_CODIGO.toString())))
            .andExpect(jsonPath("$.[*].wsAsociado").value(hasItem(DEFAULT_WS_ASOCIADO.toString())))
            .andExpect(jsonPath("$.[*].tipo").value(hasItem(DEFAULT_TIPO.toString())));
    }
    
    @Test
    @Transactional
    public void getOperacion() throws Exception {
        // Initialize the database
        operacionRepository.saveAndFlush(operacion);

        // Get the operacion
        restOperacionMockMvc.perform(get("/api/operacions/{id}", operacion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(operacion.getId().intValue()))
            .andExpect(jsonPath("$.codigo").value(DEFAULT_CODIGO.toString()))
            .andExpect(jsonPath("$.wsAsociado").value(DEFAULT_WS_ASOCIADO.toString()))
            .andExpect(jsonPath("$.tipo").value(DEFAULT_TIPO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingOperacion() throws Exception {
        // Get the operacion
        restOperacionMockMvc.perform(get("/api/operacions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateOperacion() throws Exception {
        // Initialize the database
        operacionRepository.saveAndFlush(operacion);

        int databaseSizeBeforeUpdate = operacionRepository.findAll().size();

        // Update the operacion
        Operacion updatedOperacion = operacionRepository.findById(operacion.getId()).get();
        // Disconnect from session so that the updates on updatedOperacion are not directly saved in db
        em.detach(updatedOperacion);
        updatedOperacion
            .codigo(UPDATED_CODIGO)
            .wsAsociado(UPDATED_WS_ASOCIADO)
            .tipo(UPDATED_TIPO);

        restOperacionMockMvc.perform(put("/api/operacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedOperacion)))
            .andExpect(status().isOk());

        // Validate the Operacion in the database
        List<Operacion> operacionList = operacionRepository.findAll();
        assertThat(operacionList).hasSize(databaseSizeBeforeUpdate);
        Operacion testOperacion = operacionList.get(operacionList.size() - 1);
        assertThat(testOperacion.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testOperacion.getWsAsociado()).isEqualTo(UPDATED_WS_ASOCIADO);
        assertThat(testOperacion.getTipo()).isEqualTo(UPDATED_TIPO);
    }

    @Test
    @Transactional
    public void updateNonExistingOperacion() throws Exception {
        int databaseSizeBeforeUpdate = operacionRepository.findAll().size();

        // Create the Operacion

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOperacionMockMvc.perform(put("/api/operacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(operacion)))
            .andExpect(status().isBadRequest());

        // Validate the Operacion in the database
        List<Operacion> operacionList = operacionRepository.findAll();
        assertThat(operacionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteOperacion() throws Exception {
        // Initialize the database
        operacionRepository.saveAndFlush(operacion);

        int databaseSizeBeforeDelete = operacionRepository.findAll().size();

        // Delete the operacion
        restOperacionMockMvc.perform(delete("/api/operacions/{id}", operacion.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Operacion> operacionList = operacionRepository.findAll();
        assertThat(operacionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Operacion.class);
        Operacion operacion1 = new Operacion();
        operacion1.setId(1L);
        Operacion operacion2 = new Operacion();
        operacion2.setId(operacion1.getId());
        assertThat(operacion1).isEqualTo(operacion2);
        operacion2.setId(2L);
        assertThat(operacion1).isNotEqualTo(operacion2);
        operacion1.setId(null);
        assertThat(operacion1).isNotEqualTo(operacion2);
    }
}
