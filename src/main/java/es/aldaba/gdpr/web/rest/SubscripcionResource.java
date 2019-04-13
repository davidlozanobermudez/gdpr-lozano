package es.aldaba.gdpr.web.rest;
import es.aldaba.gdpr.domain.Subscripcion;
import es.aldaba.gdpr.repository.SubscripcionRepository;
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
 * REST controller for managing Subscripcion.
 */
@RestController
@RequestMapping("/api")
public class SubscripcionResource {

    private final Logger log = LoggerFactory.getLogger(SubscripcionResource.class);

    private static final String ENTITY_NAME = "subscripcion";

    private final SubscripcionRepository subscripcionRepository;

    public SubscripcionResource(SubscripcionRepository subscripcionRepository) {
        this.subscripcionRepository = subscripcionRepository;
    }

    /**
     * POST  /subscripcions : Create a new subscripcion.
     *
     * @param subscripcion the subscripcion to create
     * @return the ResponseEntity with status 201 (Created) and with body the new subscripcion, or with status 400 (Bad Request) if the subscripcion has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/subscripcions")
    public ResponseEntity<Subscripcion> createSubscripcion(@RequestBody Subscripcion subscripcion) throws URISyntaxException {
        log.debug("REST request to save Subscripcion : {}", subscripcion);
        if (subscripcion.getId() != null) {
            throw new BadRequestAlertException("A new subscripcion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Subscripcion result = subscripcionRepository.save(subscripcion);
        return ResponseEntity.created(new URI("/api/subscripcions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /subscripcions : Updates an existing subscripcion.
     *
     * @param subscripcion the subscripcion to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated subscripcion,
     * or with status 400 (Bad Request) if the subscripcion is not valid,
     * or with status 500 (Internal Server Error) if the subscripcion couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/subscripcions")
    public ResponseEntity<Subscripcion> updateSubscripcion(@RequestBody Subscripcion subscripcion) throws URISyntaxException {
        log.debug("REST request to update Subscripcion : {}", subscripcion);
        if (subscripcion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Subscripcion result = subscripcionRepository.save(subscripcion);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, subscripcion.getId().toString()))
            .body(result);
    }

    /**
     * GET  /subscripcions : get all the subscripcions.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of subscripcions in body
     */
    @GetMapping("/subscripcions")
    public List<Subscripcion> getAllSubscripcions() {
        log.debug("REST request to get all Subscripcions");
        return subscripcionRepository.findAll();
    }

    /**
     * GET  /subscripcions/:id : get the "id" subscripcion.
     *
     * @param id the id of the subscripcion to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the subscripcion, or with status 404 (Not Found)
     */
    @GetMapping("/subscripcions/{id}")
    public ResponseEntity<Subscripcion> getSubscripcion(@PathVariable Long id) {
        log.debug("REST request to get Subscripcion : {}", id);
        Optional<Subscripcion> subscripcion = subscripcionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(subscripcion);
    }

    /**
     * DELETE  /subscripcions/:id : delete the "id" subscripcion.
     *
     * @param id the id of the subscripcion to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/subscripcions/{id}")
    public ResponseEntity<Void> deleteSubscripcion(@PathVariable Long id) {
        log.debug("REST request to delete Subscripcion : {}", id);
        subscripcionRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
