package es.aldaba.gdpr.web.rest;
import es.aldaba.gdpr.domain.Contacto;
import es.aldaba.gdpr.repository.ContactoRepository;
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
 * REST controller for managing Contacto.
 */
@RestController
@RequestMapping("/api")
public class ContactoResource {

    private final Logger log = LoggerFactory.getLogger(ContactoResource.class);

    private static final String ENTITY_NAME = "contacto";

    private final ContactoRepository contactoRepository;

    public ContactoResource(ContactoRepository contactoRepository) {
        this.contactoRepository = contactoRepository;
    }

    /**
     * POST  /contactos : Create a new contacto.
     *
     * @param contacto the contacto to create
     * @return the ResponseEntity with status 201 (Created) and with body the new contacto, or with status 400 (Bad Request) if the contacto has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/contactos")
    public ResponseEntity<Contacto> createContacto(@RequestBody Contacto contacto) throws URISyntaxException {
        log.debug("REST request to save Contacto : {}", contacto);
        if (contacto.getId() != null) {
            throw new BadRequestAlertException("A new contacto cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Contacto result = contactoRepository.save(contacto);
        return ResponseEntity.created(new URI("/api/contactos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /contactos : Updates an existing contacto.
     *
     * @param contacto the contacto to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated contacto,
     * or with status 400 (Bad Request) if the contacto is not valid,
     * or with status 500 (Internal Server Error) if the contacto couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/contactos")
    public ResponseEntity<Contacto> updateContacto(@RequestBody Contacto contacto) throws URISyntaxException {
        log.debug("REST request to update Contacto : {}", contacto);
        if (contacto.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Contacto result = contactoRepository.save(contacto);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, contacto.getId().toString()))
            .body(result);
    }

    /**
     * GET  /contactos : get all the contactos.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many)
     * @return the ResponseEntity with status 200 (OK) and the list of contactos in body
     */
    @GetMapping("/contactos")
    public List<Contacto> getAllContactos(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Contactos");
        return contactoRepository.findAllWithEagerRelationships();
    }

    /**
     * GET  /contactos/:id : get the "id" contacto.
     *
     * @param id the id of the contacto to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the contacto, or with status 404 (Not Found)
     */
    @GetMapping("/contactos/{id}")
    public ResponseEntity<Contacto> getContacto(@PathVariable Long id) {
        log.debug("REST request to get Contacto : {}", id);
        Optional<Contacto> contacto = contactoRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(contacto);
    }

    /**
     * DELETE  /contactos/:id : delete the "id" contacto.
     *
     * @param id the id of the contacto to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/contactos/{id}")
    public ResponseEntity<Void> deleteContacto(@PathVariable Long id) {
        log.debug("REST request to delete Contacto : {}", id);
        contactoRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
