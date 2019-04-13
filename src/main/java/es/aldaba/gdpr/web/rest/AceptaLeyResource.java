package es.aldaba.gdpr.web.rest;
import es.aldaba.gdpr.domain.AceptaLey;
import es.aldaba.gdpr.repository.AceptaLeyRepository;
import es.aldaba.gdpr.web.rest.errors.BadRequestAlertException;
import es.aldaba.gdpr.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing AceptaLey.
 */
@RestController
@RequestMapping("/api")
public class AceptaLeyResource {

    private final Logger log = LoggerFactory.getLogger(AceptaLeyResource.class);

    private static final String ENTITY_NAME = "aceptaLey";

    private final AceptaLeyRepository aceptaLeyRepository;

    public AceptaLeyResource(AceptaLeyRepository aceptaLeyRepository) {
        this.aceptaLeyRepository = aceptaLeyRepository;
    }

    /**
     * POST  /acepta-leys : Create a new aceptaLey.
     *
     * @param aceptaLey the aceptaLey to create
     * @return the ResponseEntity with status 201 (Created) and with body the new aceptaLey, or with status 400 (Bad Request) if the aceptaLey has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/acepta-leys")
    public ResponseEntity<AceptaLey> createAceptaLey(@Valid @RequestBody AceptaLey aceptaLey) throws URISyntaxException {
        log.debug("REST request to save AceptaLey : {}", aceptaLey);
        if (aceptaLey.getId() != null) {
            throw new BadRequestAlertException("A new aceptaLey cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AceptaLey result = aceptaLeyRepository.save(aceptaLey);
        return ResponseEntity.created(new URI("/api/acepta-leys/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /acepta-leys : Updates an existing aceptaLey.
     *
     * @param aceptaLey the aceptaLey to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated aceptaLey,
     * or with status 400 (Bad Request) if the aceptaLey is not valid,
     * or with status 500 (Internal Server Error) if the aceptaLey couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/acepta-leys")
    public ResponseEntity<AceptaLey> updateAceptaLey(@Valid @RequestBody AceptaLey aceptaLey) throws URISyntaxException {
        log.debug("REST request to update AceptaLey : {}", aceptaLey);
        if (aceptaLey.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AceptaLey result = aceptaLeyRepository.save(aceptaLey);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, aceptaLey.getId().toString()))
            .body(result);
    }

    /**
     * GET  /acepta-leys : get all the aceptaLeys.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of aceptaLeys in body
     */
    @GetMapping("/acepta-leys")
    public List<AceptaLey> getAllAceptaLeys() {
        log.debug("REST request to get all AceptaLeys");
        return aceptaLeyRepository.findAll();
    }

    /**
     * GET  /acepta-leys/:id : get the "id" aceptaLey.
     *
     * @param id the id of the aceptaLey to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the aceptaLey, or with status 404 (Not Found)
     */
    @GetMapping("/acepta-leys/{id}")
    public ResponseEntity<AceptaLey> getAceptaLey(@PathVariable Long id) {
        log.debug("REST request to get AceptaLey : {}", id);
        Optional<AceptaLey> aceptaLey = aceptaLeyRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(aceptaLey);
    }

    /**
     * DELETE  /acepta-leys/:id : delete the "id" aceptaLey.
     *
     * @param id the id of the aceptaLey to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/acepta-leys/{id}")
    public ResponseEntity<Void> deleteAceptaLey(@PathVariable Long id) {
        log.debug("REST request to delete AceptaLey : {}", id);
        aceptaLeyRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
