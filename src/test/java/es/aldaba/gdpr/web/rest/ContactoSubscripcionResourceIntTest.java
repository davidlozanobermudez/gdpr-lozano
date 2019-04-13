package es.aldaba.gdpr.web.rest;

import es.aldaba.gdpr.GdprLozanoApp;

import es.aldaba.gdpr.domain.ContactoSubscripcion;
import es.aldaba.gdpr.repository.ContactoSubscripcionRepository;
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
 * Test class for the ContactoSubscripcionResource REST controller.
 *
 * @see ContactoSubscripcionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GdprLozanoApp.class)
public class ContactoSubscripcionResourceIntTest {

    private static final Instant DEFAULT_FECHA = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FECHA = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private ContactoSubscripcionRepository contactoSubscripcionRepository;

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

    private MockMvc restContactoSubscripcionMockMvc;

    private ContactoSubscripcion contactoSubscripcion;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ContactoSubscripcionResource contactoSubscripcionResource = new ContactoSubscripcionResource(contactoSubscripcionRepository);
        this.restContactoSubscripcionMockMvc = MockMvcBuilders.standaloneSetup(contactoSubscripcionResource)
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
    public static ContactoSubscripcion createEntity(EntityManager em) {
        ContactoSubscripcion contactoSubscripcion = new ContactoSubscripcion()
            .fecha(DEFAULT_FECHA);
        return contactoSubscripcion;
    }

    @Before
    public void initTest() {
        contactoSubscripcion = createEntity(em);
    }

    @Test
    @Transactional
    public void createContactoSubscripcion() throws Exception {
        int databaseSizeBeforeCreate = contactoSubscripcionRepository.findAll().size();

        // Create the ContactoSubscripcion
        restContactoSubscripcionMockMvc.perform(post("/api/contacto-subscripcions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contactoSubscripcion)))
            .andExpect(status().isCreated());

        // Validate the ContactoSubscripcion in the database
        List<ContactoSubscripcion> contactoSubscripcionList = contactoSubscripcionRepository.findAll();
        assertThat(contactoSubscripcionList).hasSize(databaseSizeBeforeCreate + 1);
        ContactoSubscripcion testContactoSubscripcion = contactoSubscripcionList.get(contactoSubscripcionList.size() - 1);
        assertThat(testContactoSubscripcion.getFecha()).isEqualTo(DEFAULT_FECHA);
    }

    @Test
    @Transactional
    public void createContactoSubscripcionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = contactoSubscripcionRepository.findAll().size();

        // Create the ContactoSubscripcion with an existing ID
        contactoSubscripcion.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restContactoSubscripcionMockMvc.perform(post("/api/contacto-subscripcions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contactoSubscripcion)))
            .andExpect(status().isBadRequest());

        // Validate the ContactoSubscripcion in the database
        List<ContactoSubscripcion> contactoSubscripcionList = contactoSubscripcionRepository.findAll();
        assertThat(contactoSubscripcionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllContactoSubscripcions() throws Exception {
        // Initialize the database
        contactoSubscripcionRepository.saveAndFlush(contactoSubscripcion);

        // Get all the contactoSubscripcionList
        restContactoSubscripcionMockMvc.perform(get("/api/contacto-subscripcions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(contactoSubscripcion.getId().intValue())))
            .andExpect(jsonPath("$.[*].fecha").value(hasItem(DEFAULT_FECHA.toString())));
    }
    
    @Test
    @Transactional
    public void getContactoSubscripcion() throws Exception {
        // Initialize the database
        contactoSubscripcionRepository.saveAndFlush(contactoSubscripcion);

        // Get the contactoSubscripcion
        restContactoSubscripcionMockMvc.perform(get("/api/contacto-subscripcions/{id}", contactoSubscripcion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(contactoSubscripcion.getId().intValue()))
            .andExpect(jsonPath("$.fecha").value(DEFAULT_FECHA.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingContactoSubscripcion() throws Exception {
        // Get the contactoSubscripcion
        restContactoSubscripcionMockMvc.perform(get("/api/contacto-subscripcions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateContactoSubscripcion() throws Exception {
        // Initialize the database
        contactoSubscripcionRepository.saveAndFlush(contactoSubscripcion);

        int databaseSizeBeforeUpdate = contactoSubscripcionRepository.findAll().size();

        // Update the contactoSubscripcion
        ContactoSubscripcion updatedContactoSubscripcion = contactoSubscripcionRepository.findById(contactoSubscripcion.getId()).get();
        // Disconnect from session so that the updates on updatedContactoSubscripcion are not directly saved in db
        em.detach(updatedContactoSubscripcion);
        updatedContactoSubscripcion
            .fecha(UPDATED_FECHA);

        restContactoSubscripcionMockMvc.perform(put("/api/contacto-subscripcions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedContactoSubscripcion)))
            .andExpect(status().isOk());

        // Validate the ContactoSubscripcion in the database
        List<ContactoSubscripcion> contactoSubscripcionList = contactoSubscripcionRepository.findAll();
        assertThat(contactoSubscripcionList).hasSize(databaseSizeBeforeUpdate);
        ContactoSubscripcion testContactoSubscripcion = contactoSubscripcionList.get(contactoSubscripcionList.size() - 1);
        assertThat(testContactoSubscripcion.getFecha()).isEqualTo(UPDATED_FECHA);
    }

    @Test
    @Transactional
    public void updateNonExistingContactoSubscripcion() throws Exception {
        int databaseSizeBeforeUpdate = contactoSubscripcionRepository.findAll().size();

        // Create the ContactoSubscripcion

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restContactoSubscripcionMockMvc.perform(put("/api/contacto-subscripcions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contactoSubscripcion)))
            .andExpect(status().isBadRequest());

        // Validate the ContactoSubscripcion in the database
        List<ContactoSubscripcion> contactoSubscripcionList = contactoSubscripcionRepository.findAll();
        assertThat(contactoSubscripcionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteContactoSubscripcion() throws Exception {
        // Initialize the database
        contactoSubscripcionRepository.saveAndFlush(contactoSubscripcion);

        int databaseSizeBeforeDelete = contactoSubscripcionRepository.findAll().size();

        // Delete the contactoSubscripcion
        restContactoSubscripcionMockMvc.perform(delete("/api/contacto-subscripcions/{id}", contactoSubscripcion.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ContactoSubscripcion> contactoSubscripcionList = contactoSubscripcionRepository.findAll();
        assertThat(contactoSubscripcionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ContactoSubscripcion.class);
        ContactoSubscripcion contactoSubscripcion1 = new ContactoSubscripcion();
        contactoSubscripcion1.setId(1L);
        ContactoSubscripcion contactoSubscripcion2 = new ContactoSubscripcion();
        contactoSubscripcion2.setId(contactoSubscripcion1.getId());
        assertThat(contactoSubscripcion1).isEqualTo(contactoSubscripcion2);
        contactoSubscripcion2.setId(2L);
        assertThat(contactoSubscripcion1).isNotEqualTo(contactoSubscripcion2);
        contactoSubscripcion1.setId(null);
        assertThat(contactoSubscripcion1).isNotEqualTo(contactoSubscripcion2);
    }
}
