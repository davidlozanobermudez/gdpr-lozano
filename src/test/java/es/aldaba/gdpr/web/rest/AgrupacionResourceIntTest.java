package es.aldaba.gdpr.web.rest;

import es.aldaba.gdpr.GdprLozanoApp;

import es.aldaba.gdpr.domain.Agrupacion;
import es.aldaba.gdpr.repository.AgrupacionRepository;
import es.aldaba.gdpr.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;


import static es.aldaba.gdpr.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the AgrupacionResource REST controller.
 *
 * @see AgrupacionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GdprLozanoApp.class)
public class AgrupacionResourceIntTest {

    private static final String DEFAULT_CODIGO = "AAAAAAAAAA";
    private static final String UPDATED_CODIGO = "BBBBBBBBBB";

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    @Autowired
    private AgrupacionRepository agrupacionRepository;

    @Mock
    private AgrupacionRepository agrupacionRepositoryMock;

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

    private MockMvc restAgrupacionMockMvc;

    private Agrupacion agrupacion;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AgrupacionResource agrupacionResource = new AgrupacionResource(agrupacionRepository);
        this.restAgrupacionMockMvc = MockMvcBuilders.standaloneSetup(agrupacionResource)
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
    public static Agrupacion createEntity(EntityManager em) {
        Agrupacion agrupacion = new Agrupacion()
            .codigo(DEFAULT_CODIGO)
            .nombre(DEFAULT_NOMBRE);
        return agrupacion;
    }

    @Before
    public void initTest() {
        agrupacion = createEntity(em);
    }

    @Test
    @Transactional
    public void createAgrupacion() throws Exception {
        int databaseSizeBeforeCreate = agrupacionRepository.findAll().size();

        // Create the Agrupacion
        restAgrupacionMockMvc.perform(post("/api/agrupacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(agrupacion)))
            .andExpect(status().isCreated());

        // Validate the Agrupacion in the database
        List<Agrupacion> agrupacionList = agrupacionRepository.findAll();
        assertThat(agrupacionList).hasSize(databaseSizeBeforeCreate + 1);
        Agrupacion testAgrupacion = agrupacionList.get(agrupacionList.size() - 1);
        assertThat(testAgrupacion.getCodigo()).isEqualTo(DEFAULT_CODIGO);
        assertThat(testAgrupacion.getNombre()).isEqualTo(DEFAULT_NOMBRE);
    }

    @Test
    @Transactional
    public void createAgrupacionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = agrupacionRepository.findAll().size();

        // Create the Agrupacion with an existing ID
        agrupacion.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAgrupacionMockMvc.perform(post("/api/agrupacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(agrupacion)))
            .andExpect(status().isBadRequest());

        // Validate the Agrupacion in the database
        List<Agrupacion> agrupacionList = agrupacionRepository.findAll();
        assertThat(agrupacionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllAgrupacions() throws Exception {
        // Initialize the database
        agrupacionRepository.saveAndFlush(agrupacion);

        // Get all the agrupacionList
        restAgrupacionMockMvc.perform(get("/api/agrupacions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(agrupacion.getId().intValue())))
            .andExpect(jsonPath("$.[*].codigo").value(hasItem(DEFAULT_CODIGO.toString())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllAgrupacionsWithEagerRelationshipsIsEnabled() throws Exception {
        AgrupacionResource agrupacionResource = new AgrupacionResource(agrupacionRepositoryMock);
        when(agrupacionRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restAgrupacionMockMvc = MockMvcBuilders.standaloneSetup(agrupacionResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restAgrupacionMockMvc.perform(get("/api/agrupacions?eagerload=true"))
        .andExpect(status().isOk());

        verify(agrupacionRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllAgrupacionsWithEagerRelationshipsIsNotEnabled() throws Exception {
        AgrupacionResource agrupacionResource = new AgrupacionResource(agrupacionRepositoryMock);
            when(agrupacionRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restAgrupacionMockMvc = MockMvcBuilders.standaloneSetup(agrupacionResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restAgrupacionMockMvc.perform(get("/api/agrupacions?eagerload=true"))
        .andExpect(status().isOk());

            verify(agrupacionRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getAgrupacion() throws Exception {
        // Initialize the database
        agrupacionRepository.saveAndFlush(agrupacion);

        // Get the agrupacion
        restAgrupacionMockMvc.perform(get("/api/agrupacions/{id}", agrupacion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(agrupacion.getId().intValue()))
            .andExpect(jsonPath("$.codigo").value(DEFAULT_CODIGO.toString()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAgrupacion() throws Exception {
        // Get the agrupacion
        restAgrupacionMockMvc.perform(get("/api/agrupacions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAgrupacion() throws Exception {
        // Initialize the database
        agrupacionRepository.saveAndFlush(agrupacion);

        int databaseSizeBeforeUpdate = agrupacionRepository.findAll().size();

        // Update the agrupacion
        Agrupacion updatedAgrupacion = agrupacionRepository.findById(agrupacion.getId()).get();
        // Disconnect from session so that the updates on updatedAgrupacion are not directly saved in db
        em.detach(updatedAgrupacion);
        updatedAgrupacion
            .codigo(UPDATED_CODIGO)
            .nombre(UPDATED_NOMBRE);

        restAgrupacionMockMvc.perform(put("/api/agrupacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAgrupacion)))
            .andExpect(status().isOk());

        // Validate the Agrupacion in the database
        List<Agrupacion> agrupacionList = agrupacionRepository.findAll();
        assertThat(agrupacionList).hasSize(databaseSizeBeforeUpdate);
        Agrupacion testAgrupacion = agrupacionList.get(agrupacionList.size() - 1);
        assertThat(testAgrupacion.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testAgrupacion.getNombre()).isEqualTo(UPDATED_NOMBRE);
    }

    @Test
    @Transactional
    public void updateNonExistingAgrupacion() throws Exception {
        int databaseSizeBeforeUpdate = agrupacionRepository.findAll().size();

        // Create the Agrupacion

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAgrupacionMockMvc.perform(put("/api/agrupacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(agrupacion)))
            .andExpect(status().isBadRequest());

        // Validate the Agrupacion in the database
        List<Agrupacion> agrupacionList = agrupacionRepository.findAll();
        assertThat(agrupacionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAgrupacion() throws Exception {
        // Initialize the database
        agrupacionRepository.saveAndFlush(agrupacion);

        int databaseSizeBeforeDelete = agrupacionRepository.findAll().size();

        // Delete the agrupacion
        restAgrupacionMockMvc.perform(delete("/api/agrupacions/{id}", agrupacion.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Agrupacion> agrupacionList = agrupacionRepository.findAll();
        assertThat(agrupacionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Agrupacion.class);
        Agrupacion agrupacion1 = new Agrupacion();
        agrupacion1.setId(1L);
        Agrupacion agrupacion2 = new Agrupacion();
        agrupacion2.setId(agrupacion1.getId());
        assertThat(agrupacion1).isEqualTo(agrupacion2);
        agrupacion2.setId(2L);
        assertThat(agrupacion1).isNotEqualTo(agrupacion2);
        agrupacion1.setId(null);
        assertThat(agrupacion1).isNotEqualTo(agrupacion2);
    }
}
