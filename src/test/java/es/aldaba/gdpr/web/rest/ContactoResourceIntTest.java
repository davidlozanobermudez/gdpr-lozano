package es.aldaba.gdpr.web.rest;

import es.aldaba.gdpr.GdprLozanoApp;

import es.aldaba.gdpr.domain.Contacto;
import es.aldaba.gdpr.repository.ContactoRepository;
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

import es.aldaba.gdpr.domain.enumeration.StatusContacto;
/**
 * Test class for the ContactoResource REST controller.
 *
 * @see ContactoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GdprLozanoApp.class)
public class ContactoResourceIntTest {

    private static final String DEFAULT_ID_CUENTA = "AAAAAAAAAA";
    private static final String UPDATED_ID_CUENTA = "BBBBBBBBBB";

    private static final StatusContacto DEFAULT_STATUS = StatusContacto.ACTIVO;
    private static final StatusContacto UPDATED_STATUS = StatusContacto.PENDIENTE_ANONIMIZACION;

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_TELEFONO = "AAAAAAAAAA";
    private static final String UPDATED_TELEFONO = "BBBBBBBBBB";

    private static final String DEFAULT_COD_PAIS = "AAAAAAAAAA";
    private static final String UPDATED_COD_PAIS = "BBBBBBBBBB";

    private static final String DEFAULT_COD_IDOMA = "AAAAAAAAAA";
    private static final String UPDATED_COD_IDOMA = "BBBBBBBBBB";

    @Autowired
    private ContactoRepository contactoRepository;

    @Mock
    private ContactoRepository contactoRepositoryMock;

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

    private MockMvc restContactoMockMvc;

    private Contacto contacto;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ContactoResource contactoResource = new ContactoResource(contactoRepository);
        this.restContactoMockMvc = MockMvcBuilders.standaloneSetup(contactoResource)
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
    public static Contacto createEntity(EntityManager em) {
        Contacto contacto = new Contacto()
            .idCuenta(DEFAULT_ID_CUENTA)
            .status(DEFAULT_STATUS)
            .email(DEFAULT_EMAIL)
            .telefono(DEFAULT_TELEFONO)
            .codPais(DEFAULT_COD_PAIS)
            .codIdoma(DEFAULT_COD_IDOMA);
        return contacto;
    }

    @Before
    public void initTest() {
        contacto = createEntity(em);
    }

    @Test
    @Transactional
    public void createContacto() throws Exception {
        int databaseSizeBeforeCreate = contactoRepository.findAll().size();

        // Create the Contacto
        restContactoMockMvc.perform(post("/api/contactos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contacto)))
            .andExpect(status().isCreated());

        // Validate the Contacto in the database
        List<Contacto> contactoList = contactoRepository.findAll();
        assertThat(contactoList).hasSize(databaseSizeBeforeCreate + 1);
        Contacto testContacto = contactoList.get(contactoList.size() - 1);
        assertThat(testContacto.getIdCuenta()).isEqualTo(DEFAULT_ID_CUENTA);
        assertThat(testContacto.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testContacto.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testContacto.getTelefono()).isEqualTo(DEFAULT_TELEFONO);
        assertThat(testContacto.getCodPais()).isEqualTo(DEFAULT_COD_PAIS);
        assertThat(testContacto.getCodIdoma()).isEqualTo(DEFAULT_COD_IDOMA);
    }

    @Test
    @Transactional
    public void createContactoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = contactoRepository.findAll().size();

        // Create the Contacto with an existing ID
        contacto.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restContactoMockMvc.perform(post("/api/contactos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contacto)))
            .andExpect(status().isBadRequest());

        // Validate the Contacto in the database
        List<Contacto> contactoList = contactoRepository.findAll();
        assertThat(contactoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllContactos() throws Exception {
        // Initialize the database
        contactoRepository.saveAndFlush(contacto);

        // Get all the contactoList
        restContactoMockMvc.perform(get("/api/contactos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(contacto.getId().intValue())))
            .andExpect(jsonPath("$.[*].idCuenta").value(hasItem(DEFAULT_ID_CUENTA.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].telefono").value(hasItem(DEFAULT_TELEFONO.toString())))
            .andExpect(jsonPath("$.[*].codPais").value(hasItem(DEFAULT_COD_PAIS.toString())))
            .andExpect(jsonPath("$.[*].codIdoma").value(hasItem(DEFAULT_COD_IDOMA.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllContactosWithEagerRelationshipsIsEnabled() throws Exception {
        ContactoResource contactoResource = new ContactoResource(contactoRepositoryMock);
        when(contactoRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restContactoMockMvc = MockMvcBuilders.standaloneSetup(contactoResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restContactoMockMvc.perform(get("/api/contactos?eagerload=true"))
        .andExpect(status().isOk());

        verify(contactoRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllContactosWithEagerRelationshipsIsNotEnabled() throws Exception {
        ContactoResource contactoResource = new ContactoResource(contactoRepositoryMock);
            when(contactoRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restContactoMockMvc = MockMvcBuilders.standaloneSetup(contactoResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restContactoMockMvc.perform(get("/api/contactos?eagerload=true"))
        .andExpect(status().isOk());

            verify(contactoRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getContacto() throws Exception {
        // Initialize the database
        contactoRepository.saveAndFlush(contacto);

        // Get the contacto
        restContactoMockMvc.perform(get("/api/contactos/{id}", contacto.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(contacto.getId().intValue()))
            .andExpect(jsonPath("$.idCuenta").value(DEFAULT_ID_CUENTA.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()))
            .andExpect(jsonPath("$.telefono").value(DEFAULT_TELEFONO.toString()))
            .andExpect(jsonPath("$.codPais").value(DEFAULT_COD_PAIS.toString()))
            .andExpect(jsonPath("$.codIdoma").value(DEFAULT_COD_IDOMA.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingContacto() throws Exception {
        // Get the contacto
        restContactoMockMvc.perform(get("/api/contactos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateContacto() throws Exception {
        // Initialize the database
        contactoRepository.saveAndFlush(contacto);

        int databaseSizeBeforeUpdate = contactoRepository.findAll().size();

        // Update the contacto
        Contacto updatedContacto = contactoRepository.findById(contacto.getId()).get();
        // Disconnect from session so that the updates on updatedContacto are not directly saved in db
        em.detach(updatedContacto);
        updatedContacto
            .idCuenta(UPDATED_ID_CUENTA)
            .status(UPDATED_STATUS)
            .email(UPDATED_EMAIL)
            .telefono(UPDATED_TELEFONO)
            .codPais(UPDATED_COD_PAIS)
            .codIdoma(UPDATED_COD_IDOMA);

        restContactoMockMvc.perform(put("/api/contactos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedContacto)))
            .andExpect(status().isOk());

        // Validate the Contacto in the database
        List<Contacto> contactoList = contactoRepository.findAll();
        assertThat(contactoList).hasSize(databaseSizeBeforeUpdate);
        Contacto testContacto = contactoList.get(contactoList.size() - 1);
        assertThat(testContacto.getIdCuenta()).isEqualTo(UPDATED_ID_CUENTA);
        assertThat(testContacto.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testContacto.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testContacto.getTelefono()).isEqualTo(UPDATED_TELEFONO);
        assertThat(testContacto.getCodPais()).isEqualTo(UPDATED_COD_PAIS);
        assertThat(testContacto.getCodIdoma()).isEqualTo(UPDATED_COD_IDOMA);
    }

    @Test
    @Transactional
    public void updateNonExistingContacto() throws Exception {
        int databaseSizeBeforeUpdate = contactoRepository.findAll().size();

        // Create the Contacto

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restContactoMockMvc.perform(put("/api/contactos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contacto)))
            .andExpect(status().isBadRequest());

        // Validate the Contacto in the database
        List<Contacto> contactoList = contactoRepository.findAll();
        assertThat(contactoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteContacto() throws Exception {
        // Initialize the database
        contactoRepository.saveAndFlush(contacto);

        int databaseSizeBeforeDelete = contactoRepository.findAll().size();

        // Delete the contacto
        restContactoMockMvc.perform(delete("/api/contactos/{id}", contacto.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Contacto> contactoList = contactoRepository.findAll();
        assertThat(contactoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Contacto.class);
        Contacto contacto1 = new Contacto();
        contacto1.setId(1L);
        Contacto contacto2 = new Contacto();
        contacto2.setId(contacto1.getId());
        assertThat(contacto1).isEqualTo(contacto2);
        contacto2.setId(2L);
        assertThat(contacto1).isNotEqualTo(contacto2);
        contacto1.setId(null);
        assertThat(contacto1).isNotEqualTo(contacto2);
    }
}
