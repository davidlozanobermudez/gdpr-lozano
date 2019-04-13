package es.aldaba.gdpr.web.rest;
import es.aldaba.gdpr.domain.TipoLey;
import es.aldaba.gdpr.repository.TipoLeyRepository;
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
 * REST controller for managing TipoLey.
 */
@RestController
@RequestMapping("/api")
public class TipoLeyResource {

    private final Logger log = LoggerFactory.getLogger(TipoLeyResource.class);

    private static final String ENTITY_NAME = "tipoLey";

    private final TipoLeyRepository tipoLeyRepository;

    public TipoLeyResource(TipoLeyRepository tipoLeyRepository) {
        this.tipoLeyRepository = tipoLeyRepository;
    }

    /**
     * POST  /tipolies : Create a new tipoLey.
     *
     * @param tipoLey the tipoLey to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tipoLey, or with status 400 (Bad Request) if the tipoLey has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tipolies")
    public ResponseEntity<TipoLey> createTipoLey(@RequestBody TipoLey tipoLey) throws URISyntaxException {
        log.debug("REST request to save TipoLey : {}", tipoLey);
        if (tipoLey.getId() != null) {
            throw new BadRequestAlertException("A new tipoLey cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TipoLey result = tipoLeyRepository.save(tipoLey);
        return ResponseEntity.created(new URI("/api/tipolies/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tipolies : Updates an existing tipoLey.
     *
     * @param tipoLey the tipoLey to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tipoLey,
     * or with status 400 (Bad Request) if the tipoLey is not valid,
     * or with status 500 (Internal Server Error) if the tipoLey couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tipolies")
    public ResponseEntity<TipoLey> updateTipoLey(@RequestBody TipoLey tipoLey) throws URISyntaxException {
        log.debug("REST request to update TipoLey : {}", tipoLey);
        if (tipoLey.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TipoLey result = tipoLeyRepository.save(tipoLey);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tipoLey.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tipolies : get all the tipolies.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of tipolies in body
     */
    @GetMapping("/tipolies")
    public List<TipoLey> getAllTipolies() {
        log.debug("REST request to get all Tipolies");
        return tipoLeyRepository.findAll();
    }

    /**
     * GET  /tipolies/:id : get the "id" tipoLey.
     *
     * @param id the id of the tipoLey to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tipoLey, or with status 404 (Not Found)
     */
    @GetMapping("/tipolies/{id}")
    public ResponseEntity<TipoLey> getTipoLey(@PathVariable Long id) {
        log.debug("REST request to get TipoLey : {}", id);
        Optional<TipoLey> tipoLey = tipoLeyRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(tipoLey);
    }

    /**
     * DELETE  /tipolies/:id : delete the "id" tipoLey.
     *
     * @param id the id of the tipoLey to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tipolies/{id}")
    public ResponseEntity<Void> deleteTipoLey(@PathVariable Long id) {
        log.debug("REST request to delete TipoLey : {}", id);
        tipoLeyRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
