package es.aldaba.gdpr.web.rest;
import es.aldaba.gdpr.domain.TrazaPeticion;
import es.aldaba.gdpr.repository.TrazaPeticionRepository;
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
 * REST controller for managing TrazaPeticion.
 */
@RestController
@RequestMapping("/api")
public class TrazaPeticionResource {

    private final Logger log = LoggerFactory.getLogger(TrazaPeticionResource.class);

    private static final String ENTITY_NAME = "trazaPeticion";

    private final TrazaPeticionRepository trazaPeticionRepository;

    public TrazaPeticionResource(TrazaPeticionRepository trazaPeticionRepository) {
        this.trazaPeticionRepository = trazaPeticionRepository;
    }

    /**
     * POST  /traza-peticions : Create a new trazaPeticion.
     *
     * @param trazaPeticion the trazaPeticion to create
     * @return the ResponseEntity with status 201 (Created) and with body the new trazaPeticion, or with status 400 (Bad Request) if the trazaPeticion has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/traza-peticions")
    public ResponseEntity<TrazaPeticion> createTrazaPeticion(@RequestBody TrazaPeticion trazaPeticion) throws URISyntaxException {
        log.debug("REST request to save TrazaPeticion : {}", trazaPeticion);
        if (trazaPeticion.getId() != null) {
            throw new BadRequestAlertException("A new trazaPeticion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TrazaPeticion result = trazaPeticionRepository.save(trazaPeticion);
        return ResponseEntity.created(new URI("/api/traza-peticions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /traza-peticions : Updates an existing trazaPeticion.
     *
     * @param trazaPeticion the trazaPeticion to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated trazaPeticion,
     * or with status 400 (Bad Request) if the trazaPeticion is not valid,
     * or with status 500 (Internal Server Error) if the trazaPeticion couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/traza-peticions")
    public ResponseEntity<TrazaPeticion> updateTrazaPeticion(@RequestBody TrazaPeticion trazaPeticion) throws URISyntaxException {
        log.debug("REST request to update TrazaPeticion : {}", trazaPeticion);
        if (trazaPeticion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TrazaPeticion result = trazaPeticionRepository.save(trazaPeticion);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, trazaPeticion.getId().toString()))
            .body(result);
    }

    /**
     * GET  /traza-peticions : get all the trazaPeticions.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of trazaPeticions in body
     */
    @GetMapping("/traza-peticions")
    public List<TrazaPeticion> getAllTrazaPeticions() {
        log.debug("REST request to get all TrazaPeticions");
        return trazaPeticionRepository.findAll();
    }

    /**
     * GET  /traza-peticions/:id : get the "id" trazaPeticion.
     *
     * @param id the id of the trazaPeticion to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the trazaPeticion, or with status 404 (Not Found)
     */
    @GetMapping("/traza-peticions/{id}")
    public ResponseEntity<TrazaPeticion> getTrazaPeticion(@PathVariable Long id) {
        log.debug("REST request to get TrazaPeticion : {}", id);
        Optional<TrazaPeticion> trazaPeticion = trazaPeticionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(trazaPeticion);
    }

    /**
     * DELETE  /traza-peticions/:id : delete the "id" trazaPeticion.
     *
     * @param id the id of the trazaPeticion to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/traza-peticions/{id}")
    public ResponseEntity<Void> deleteTrazaPeticion(@PathVariable Long id) {
        log.debug("REST request to delete TrazaPeticion : {}", id);
        trazaPeticionRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
