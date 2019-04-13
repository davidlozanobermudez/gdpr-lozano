package es.aldaba.gdpr.web.rest;
import es.aldaba.gdpr.domain.Ley;
import es.aldaba.gdpr.repository.LeyRepository;
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
 * REST controller for managing Ley.
 */
@RestController
@RequestMapping("/api")
public class LeyResource {

    private final Logger log = LoggerFactory.getLogger(LeyResource.class);

    private static final String ENTITY_NAME = "ley";

    private final LeyRepository leyRepository;

    public LeyResource(LeyRepository leyRepository) {
        this.leyRepository = leyRepository;
    }

    /**
     * POST  /leys : Create a new ley.
     *
     * @param ley the ley to create
     * @return the ResponseEntity with status 201 (Created) and with body the new ley, or with status 400 (Bad Request) if the ley has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/leys")
    public ResponseEntity<Ley> createLey(@RequestBody Ley ley) throws URISyntaxException {
        log.debug("REST request to save Ley : {}", ley);
        if (ley.getId() != null) {
            throw new BadRequestAlertException("A new ley cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Ley result = leyRepository.save(ley);
        return ResponseEntity.created(new URI("/api/leys/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /leys : Updates an existing ley.
     *
     * @param ley the ley to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated ley,
     * or with status 400 (Bad Request) if the ley is not valid,
     * or with status 500 (Internal Server Error) if the ley couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/leys")
    public ResponseEntity<Ley> updateLey(@RequestBody Ley ley) throws URISyntaxException {
        log.debug("REST request to update Ley : {}", ley);
        if (ley.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Ley result = leyRepository.save(ley);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, ley.getId().toString()))
            .body(result);
    }

    /**
     * GET  /leys : get all the leys.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of leys in body
     */
    @GetMapping("/leys")
    public List<Ley> getAllLeys() {
        log.debug("REST request to get all Leys");
        return leyRepository.findAll();
    }

    /**
     * GET  /leys/:id : get the "id" ley.
     *
     * @param id the id of the ley to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the ley, or with status 404 (Not Found)
     */
    @GetMapping("/leys/{id}")
    public ResponseEntity<Ley> getLey(@PathVariable Long id) {
        log.debug("REST request to get Ley : {}", id);
        Optional<Ley> ley = leyRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(ley);
    }

    /**
     * DELETE  /leys/:id : delete the "id" ley.
     *
     * @param id the id of the ley to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/leys/{id}")
    public ResponseEntity<Void> deleteLey(@PathVariable Long id) {
        log.debug("REST request to delete Ley : {}", id);
        leyRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
