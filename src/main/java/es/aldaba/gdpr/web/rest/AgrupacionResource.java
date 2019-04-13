package es.aldaba.gdpr.web.rest;
import es.aldaba.gdpr.domain.Agrupacion;
import es.aldaba.gdpr.repository.AgrupacionRepository;
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
 * REST controller for managing Agrupacion.
 */
@RestController
@RequestMapping("/api")
public class AgrupacionResource {

    private final Logger log = LoggerFactory.getLogger(AgrupacionResource.class);

    private static final String ENTITY_NAME = "agrupacion";

    private final AgrupacionRepository agrupacionRepository;

    public AgrupacionResource(AgrupacionRepository agrupacionRepository) {
        this.agrupacionRepository = agrupacionRepository;
    }

    /**
     * POST  /agrupacions : Create a new agrupacion.
     *
     * @param agrupacion the agrupacion to create
     * @return the ResponseEntity with status 201 (Created) and with body the new agrupacion, or with status 400 (Bad Request) if the agrupacion has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/agrupacions")
    public ResponseEntity<Agrupacion> createAgrupacion(@RequestBody Agrupacion agrupacion) throws URISyntaxException {
        log.debug("REST request to save Agrupacion : {}", agrupacion);
        if (agrupacion.getId() != null) {
            throw new BadRequestAlertException("A new agrupacion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Agrupacion result = agrupacionRepository.save(agrupacion);
        return ResponseEntity.created(new URI("/api/agrupacions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /agrupacions : Updates an existing agrupacion.
     *
     * @param agrupacion the agrupacion to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated agrupacion,
     * or with status 400 (Bad Request) if the agrupacion is not valid,
     * or with status 500 (Internal Server Error) if the agrupacion couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/agrupacions")
    public ResponseEntity<Agrupacion> updateAgrupacion(@RequestBody Agrupacion agrupacion) throws URISyntaxException {
        log.debug("REST request to update Agrupacion : {}", agrupacion);
        if (agrupacion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Agrupacion result = agrupacionRepository.save(agrupacion);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, agrupacion.getId().toString()))
            .body(result);
    }

    /**
     * GET  /agrupacions : get all the agrupacions.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many)
     * @return the ResponseEntity with status 200 (OK) and the list of agrupacions in body
     */
    @GetMapping("/agrupacions")
    public List<Agrupacion> getAllAgrupacions(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Agrupacions");
        return agrupacionRepository.findAllWithEagerRelationships();
    }

    /**
     * GET  /agrupacions/:id : get the "id" agrupacion.
     *
     * @param id the id of the agrupacion to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the agrupacion, or with status 404 (Not Found)
     */
    @GetMapping("/agrupacions/{id}")
    public ResponseEntity<Agrupacion> getAgrupacion(@PathVariable Long id) {
        log.debug("REST request to get Agrupacion : {}", id);
        Optional<Agrupacion> agrupacion = agrupacionRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(agrupacion);
    }

    /**
     * DELETE  /agrupacions/:id : delete the "id" agrupacion.
     *
     * @param id the id of the agrupacion to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/agrupacions/{id}")
    public ResponseEntity<Void> deleteAgrupacion(@PathVariable Long id) {
        log.debug("REST request to delete Agrupacion : {}", id);
        agrupacionRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
