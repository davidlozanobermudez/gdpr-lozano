package es.aldaba.gdpr.web.rest;
import es.aldaba.gdpr.domain.SubscripcionInt;
import es.aldaba.gdpr.repository.SubscripcionIntRepository;
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
 * REST controller for managing SubscripcionInt.
 */
@RestController
@RequestMapping("/api")
public class SubscripcionIntResource {

    private final Logger log = LoggerFactory.getLogger(SubscripcionIntResource.class);

    private static final String ENTITY_NAME = "subscripcionInt";

    private final SubscripcionIntRepository subscripcionIntRepository;

    public SubscripcionIntResource(SubscripcionIntRepository subscripcionIntRepository) {
        this.subscripcionIntRepository = subscripcionIntRepository;
    }

    /**
     * POST  /subscripcion-ints : Create a new subscripcionInt.
     *
     * @param subscripcionInt the subscripcionInt to create
     * @return the ResponseEntity with status 201 (Created) and with body the new subscripcionInt, or with status 400 (Bad Request) if the subscripcionInt has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/subscripcion-ints")
    public ResponseEntity<SubscripcionInt> createSubscripcionInt(@RequestBody SubscripcionInt subscripcionInt) throws URISyntaxException {
        log.debug("REST request to save SubscripcionInt : {}", subscripcionInt);
        if (subscripcionInt.getId() != null) {
            throw new BadRequestAlertException("A new subscripcionInt cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SubscripcionInt result = subscripcionIntRepository.save(subscripcionInt);
        return ResponseEntity.created(new URI("/api/subscripcion-ints/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /subscripcion-ints : Updates an existing subscripcionInt.
     *
     * @param subscripcionInt the subscripcionInt to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated subscripcionInt,
     * or with status 400 (Bad Request) if the subscripcionInt is not valid,
     * or with status 500 (Internal Server Error) if the subscripcionInt couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/subscripcion-ints")
    public ResponseEntity<SubscripcionInt> updateSubscripcionInt(@RequestBody SubscripcionInt subscripcionInt) throws URISyntaxException {
        log.debug("REST request to update SubscripcionInt : {}", subscripcionInt);
        if (subscripcionInt.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SubscripcionInt result = subscripcionIntRepository.save(subscripcionInt);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, subscripcionInt.getId().toString()))
            .body(result);
    }

    /**
     * GET  /subscripcion-ints : get all the subscripcionInts.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of subscripcionInts in body
     */
    @GetMapping("/subscripcion-ints")
    public List<SubscripcionInt> getAllSubscripcionInts() {
        log.debug("REST request to get all SubscripcionInts");
        return subscripcionIntRepository.findAll();
    }

    /**
     * GET  /subscripcion-ints/:id : get the "id" subscripcionInt.
     *
     * @param id the id of the subscripcionInt to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the subscripcionInt, or with status 404 (Not Found)
     */
    @GetMapping("/subscripcion-ints/{id}")
    public ResponseEntity<SubscripcionInt> getSubscripcionInt(@PathVariable Long id) {
        log.debug("REST request to get SubscripcionInt : {}", id);
        Optional<SubscripcionInt> subscripcionInt = subscripcionIntRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(subscripcionInt);
    }

    /**
     * DELETE  /subscripcion-ints/:id : delete the "id" subscripcionInt.
     *
     * @param id the id of the subscripcionInt to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/subscripcion-ints/{id}")
    public ResponseEntity<Void> deleteSubscripcionInt(@PathVariable Long id) {
        log.debug("REST request to delete SubscripcionInt : {}", id);
        subscripcionIntRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
