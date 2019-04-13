package es.aldaba.gdpr.web.rest;

import es.aldaba.gdpr.GdprLozanoApp;

import es.aldaba.gdpr.domain.TrazaPeticion;
import es.aldaba.gdpr.repository.TrazaPeticionRepository;
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

import es.aldaba.gdpr.domain.enumeration.TipoNotificacion;
import es.aldaba.gdpr.domain.enumeration.NombreOperacion;
/**
 * Test class for the TrazaPeticionResource REST controller.
 *
 * @see TrazaPeticionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GdprLozanoApp.class)
public class TrazaPeticionResourceIntTest {

    private static final TipoNotificacion DEFAULT_TIPO_NOTIFICACION = TipoNotificacion.EMAIL;
    private static final TipoNotificacion UPDATED_TIPO_NOTIFICACION = TipoNotificacion.TELEFONO;

    private static final NombreOperacion DEFAULT_NOMBRE_OPERACION = NombreOperacion.ACEPTACION_VERSION_LEY;
    private static final NombreOperacion UPDATED_NOMBRE_OPERACION = NombreOperacion.ALTA_SUBSCRIPCION;

    private static final Instant DEFAULT_FECHA = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FECHA = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_OBSERVACIONES = "AAAAAAAAAA";
    private static final String UPDATED_OBSERVACIONES = "BBBBBBBBBB";

    @Autowired
    private TrazaPeticionRepository trazaPeticionRepository;

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

    private MockMvc restTrazaPeticionMockMvc;

    private TrazaPeticion trazaPeticion;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TrazaPeticionResource trazaPeticionResource = new TrazaPeticionResource(trazaPeticionRepository);
        this.restTrazaPeticionMockMvc = MockMvcBuilders.standaloneSetup(trazaPeticionResource)
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
    public static TrazaPeticion createEntity(EntityManager em) {
        TrazaPeticion trazaPeticion = new TrazaPeticion()
            .tipoNotificacion(DEFAULT_TIPO_NOTIFICACION)
            .nombreOperacion(DEFAULT_NOMBRE_OPERACION)
            .fecha(DEFAULT_FECHA)
            .observaciones(DEFAULT_OBSERVACIONES);
        return trazaPeticion;
    }

    @Before
    public void initTest() {
        trazaPeticion = createEntity(em);
    }

    @Test
    @Transactional
    public void createTrazaPeticion() throws Exception {
        int databaseSizeBeforeCreate = trazaPeticionRepository.findAll().size();

        // Create the TrazaPeticion
        restTrazaPeticionMockMvc.perform(post("/api/traza-peticions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(trazaPeticion)))
            .andExpect(status().isCreated());

        // Validate the TrazaPeticion in the database
        List<TrazaPeticion> trazaPeticionList = trazaPeticionRepository.findAll();
        assertThat(trazaPeticionList).hasSize(databaseSizeBeforeCreate + 1);
        TrazaPeticion testTrazaPeticion = trazaPeticionList.get(trazaPeticionList.size() - 1);
        assertThat(testTrazaPeticion.getTipoNotificacion()).isEqualTo(DEFAULT_TIPO_NOTIFICACION);
        assertThat(testTrazaPeticion.getNombreOperacion()).isEqualTo(DEFAULT_NOMBRE_OPERACION);
        assertThat(testTrazaPeticion.getFecha()).isEqualTo(DEFAULT_FECHA);
        assertThat(testTrazaPeticion.getObservaciones()).isEqualTo(DEFAULT_OBSERVACIONES);
    }

    @Test
    @Transactional
    public void createTrazaPeticionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = trazaPeticionRepository.findAll().size();

        // Create the TrazaPeticion with an existing ID
        trazaPeticion.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTrazaPeticionMockMvc.perform(post("/api/traza-peticions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(trazaPeticion)))
            .andExpect(status().isBadRequest());

        // Validate the TrazaPeticion in the database
        List<TrazaPeticion> trazaPeticionList = trazaPeticionRepository.findAll();
        assertThat(trazaPeticionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTrazaPeticions() throws Exception {
        // Initialize the database
        trazaPeticionRepository.saveAndFlush(trazaPeticion);

        // Get all the trazaPeticionList
        restTrazaPeticionMockMvc.perform(get("/api/traza-peticions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(trazaPeticion.getId().intValue())))
            .andExpect(jsonPath("$.[*].tipoNotificacion").value(hasItem(DEFAULT_TIPO_NOTIFICACION.toString())))
            .andExpect(jsonPath("$.[*].nombreOperacion").value(hasItem(DEFAULT_NOMBRE_OPERACION.toString())))
            .andExpect(jsonPath("$.[*].fecha").value(hasItem(DEFAULT_FECHA.toString())))
            .andExpect(jsonPath("$.[*].observaciones").value(hasItem(DEFAULT_OBSERVACIONES.toString())));
    }
    
    @Test
    @Transactional
    public void getTrazaPeticion() throws Exception {
        // Initialize the database
        trazaPeticionRepository.saveAndFlush(trazaPeticion);

        // Get the trazaPeticion
        restTrazaPeticionMockMvc.perform(get("/api/traza-peticions/{id}", trazaPeticion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(trazaPeticion.getId().intValue()))
            .andExpect(jsonPath("$.tipoNotificacion").value(DEFAULT_TIPO_NOTIFICACION.toString()))
            .andExpect(jsonPath("$.nombreOperacion").value(DEFAULT_NOMBRE_OPERACION.toString()))
            .andExpect(jsonPath("$.fecha").value(DEFAULT_FECHA.toString()))
            .andExpect(jsonPath("$.observaciones").value(DEFAULT_OBSERVACIONES.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTrazaPeticion() throws Exception {
        // Get the trazaPeticion
        restTrazaPeticionMockMvc.perform(get("/api/traza-peticions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTrazaPeticion() throws Exception {
        // Initialize the database
        trazaPeticionRepository.saveAndFlush(trazaPeticion);

        int databaseSizeBeforeUpdate = trazaPeticionRepository.findAll().size();

        // Update the trazaPeticion
        TrazaPeticion updatedTrazaPeticion = trazaPeticionRepository.findById(trazaPeticion.getId()).get();
        // Disconnect from session so that the updates on updatedTrazaPeticion are not directly saved in db
        em.detach(updatedTrazaPeticion);
        updatedTrazaPeticion
            .tipoNotificacion(UPDATED_TIPO_NOTIFICACION)
            .nombreOperacion(UPDATED_NOMBRE_OPERACION)
            .fecha(UPDATED_FECHA)
            .observaciones(UPDATED_OBSERVACIONES);

        restTrazaPeticionMockMvc.perform(put("/api/traza-peticions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTrazaPeticion)))
            .andExpect(status().isOk());

        // Validate the TrazaPeticion in the database
        List<TrazaPeticion> trazaPeticionList = trazaPeticionRepository.findAll();
        assertThat(trazaPeticionList).hasSize(databaseSizeBeforeUpdate);
        TrazaPeticion testTrazaPeticion = trazaPeticionList.get(trazaPeticionList.size() - 1);
        assertThat(testTrazaPeticion.getTipoNotificacion()).isEqualTo(UPDATED_TIPO_NOTIFICACION);
        assertThat(testTrazaPeticion.getNombreOperacion()).isEqualTo(UPDATED_NOMBRE_OPERACION);
        assertThat(testTrazaPeticion.getFecha()).isEqualTo(UPDATED_FECHA);
        assertThat(testTrazaPeticion.getObservaciones()).isEqualTo(UPDATED_OBSERVACIONES);
    }

    @Test
    @Transactional
    public void updateNonExistingTrazaPeticion() throws Exception {
        int databaseSizeBeforeUpdate = trazaPeticionRepository.findAll().size();

        // Create the TrazaPeticion

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTrazaPeticionMockMvc.perform(put("/api/traza-peticions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(trazaPeticion)))
            .andExpect(status().isBadRequest());

        // Validate the TrazaPeticion in the database
        List<TrazaPeticion> trazaPeticionList = trazaPeticionRepository.findAll();
        assertThat(trazaPeticionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTrazaPeticion() throws Exception {
        // Initialize the database
        trazaPeticionRepository.saveAndFlush(trazaPeticion);

        int databaseSizeBeforeDelete = trazaPeticionRepository.findAll().size();

        // Delete the trazaPeticion
        restTrazaPeticionMockMvc.perform(delete("/api/traza-peticions/{id}", trazaPeticion.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TrazaPeticion> trazaPeticionList = trazaPeticionRepository.findAll();
        assertThat(trazaPeticionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TrazaPeticion.class);
        TrazaPeticion trazaPeticion1 = new TrazaPeticion();
        trazaPeticion1.setId(1L);
        TrazaPeticion trazaPeticion2 = new TrazaPeticion();
        trazaPeticion2.setId(trazaPeticion1.getId());
        assertThat(trazaPeticion1).isEqualTo(trazaPeticion2);
        trazaPeticion2.setId(2L);
        assertThat(trazaPeticion1).isNotEqualTo(trazaPeticion2);
        trazaPeticion1.setId(null);
        assertThat(trazaPeticion1).isNotEqualTo(trazaPeticion2);
    }
}
