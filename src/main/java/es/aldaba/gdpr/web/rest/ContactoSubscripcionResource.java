package es.aldaba.gdpr.web.rest;
import es.aldaba.gdpr.domain.ContactoSubscripcion;
import es.aldaba.gdpr.repository.ContactoSubscripcionRepository;
import es.aldaba.gdpr.web.rest.errors.BadRequestAlertException;
import es.aldaba.gdpr.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing ContactoSubscripcion.
 */
@RestController
@RequestMapping("/api")
public class ContactoSubscripcionResource {

    private final Logger log = LoggerFactory.getLogger(ContactoSubscripcionResource.class);

    private static final String ENTITY_NAME = "contactoSubscripcion";

    private final ContactoSubscripcionRepository contactoSubscripcionRepository;

    public ContactoSubscripcionResource(ContactoSubscripcionRepository contactoSubscripcionRepository) {
        this.contactoSubscripcionRepository = contactoSubscripcionRepository;
    }

    /**
     * POST  /contacto-subscripcions : Create a new contactoSubscripcion.
     *
     * @param contactoSubscripcion the contactoSubscripcion to create
     * @return the ResponseEntity with status 201 (Created) and with body the new contactoSubscripcion, or with status 400 (Bad Request) if the contactoSubscripcion has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/contacto-subscripcions")
    public ResponseEntity<ContactoSubscripcion> createContactoSubscripcion(@RequestBody ContactoSubscripcion contactoSubscripcion) throws URISyntaxException {
        log.debug("REST request to save ContactoSubscripcion : {}", contactoSubscripcion);
        if (contactoSubscripcion.getId() != null) {
            throw new BadRequestAlertException("A new contactoSubscripcion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ContactoSubscripcion result = contactoSubscripcionRepository.save(contactoSubscripcion);
        return ResponseEntity.created(new URI("/api/contacto-subscripcions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /contacto-subscripcions : Updates an existing contactoSubscripcion.
     *
     * @param contactoSubscripcion the contactoSubscripcion to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated contactoSubscripcion,
     * or with status 400 (Bad Request) if the contactoSubscripcion is not valid,
     * or with status 500 (Internal Server Error) if the contactoSubscripcion couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/contacto-subscripcions")
    public ResponseEntity<ContactoSubscripcion> updateContactoSubscripcion(@RequestBody ContactoSubscripcion contactoSubscripcion) throws URISyntaxException {
        log.debug("REST request to update ContactoSubscripcion : {}", contactoSubscripcion);
        if (contactoSubscripcion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ContactoSubscripcion result = contactoSubscripcionRepository.save(contactoSubscripcion);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, contactoSubscripcion.getId().toString()))
            .body(result);
    }

    /**
     * GET  /contacto-subscripcions : get all the contactoSubscripcions.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of contactoSubscripcions in body
     */
    @GetMapping("/contacto-subscripcions")
    public List<ContactoSubscripcion> getAllContactoSubscripcions() {
        log.debug("REST request to get all ContactoSubscripcions");
        return contactoSubscripcionRepository.findAll();
    }

    /**
     * GET  /contacto-subscripcions/:id : get the "id" contactoSubscripcion.
     *
     * @param id the id of the contactoSubscripcion to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the contactoSubscripcion, or with status 404 (Not Found)
     */
    @GetMapping("/contacto-subscripcions/{id}")
    public ResponseEntity<ContactoSubscripcion> getContactoSubscripcion(@PathVariable Long id) {
        log.debug("REST request to get ContactoSubscripcion : {}", id);
        Optional<ContactoSubscripcion> contactoSubscripcion = contactoSubscripcionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(contactoSubscripcion);
    }

    /**
     * DELETE  /contacto-subscripcions/:id : delete the "id" contactoSubscripcion.
     *
     * @param id the id of the contactoSubscripcion to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/contacto-subscripcions/{id}")
    public ResponseEntity<Void> deleteContactoSubscripcion(@PathVariable Long id) {
        log.debug("REST request to delete ContactoSubscripcion : {}", id);
        contactoSubscripcionRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
