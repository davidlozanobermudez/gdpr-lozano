package es.aldaba.gdpr.web.rest;
import es.aldaba.gdpr.domain.Sistema;
import es.aldaba.gdpr.repository.SistemaRepository;
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
 * REST controller for managing Sistema.
 */
@RestController
@RequestMapping("/api")
public class SistemaResource {

    private final Logger log = LoggerFactory.getLogger(SistemaResource.class);

    private static final String ENTITY_NAME = "sistema";

    private final SistemaRepository sistemaRepository;

    public SistemaResource(SistemaRepository sistemaRepository) {
        this.sistemaRepository = sistemaRepository;
    }

    /**
     * POST  /sistemas : Create a new sistema.
     *
     * @param sistema the sistema to create
     * @return the ResponseEntity with status 201 (Created) and with body the new sistema, or with status 400 (Bad Request) if the sistema has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/sistemas")
    public ResponseEntity<Sistema> createSistema(@RequestBody Sistema sistema) throws URISyntaxException {
        log.debug("REST request to save Sistema : {}", sistema);
        if (sistema.getId() != null) {
            throw new BadRequestAlertException("A new sistema cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Sistema result = sistemaRepository.save(sistema);
        return ResponseEntity.created(new URI("/api/sistemas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /sistemas : Updates an existing sistema.
     *
     * @param sistema the sistema to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated sistema,
     * or with status 400 (Bad Request) if the sistema is not valid,
     * or with status 500 (Internal Server Error) if the sistema couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/sistemas")
    public ResponseEntity<Sistema> updateSistema(@RequestBody Sistema sistema) throws URISyntaxException {
        log.debug("REST request to update Sistema : {}", sistema);
        if (sistema.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Sistema result = sistemaRepository.save(sistema);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, sistema.getId().toString()))
            .body(result);
    }

    /**
     * GET  /sistemas : get all the sistemas.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of sistemas in body
     */
    @GetMapping("/sistemas")
    public List<Sistema> getAllSistemas() {
        log.debug("REST request to get all Sistemas");
        return sistemaRepository.findAll();
    }

    /**
     * GET  /sistemas/:id : get the "id" sistema.
     *
     * @param id the id of the sistema to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the sistema, or with status 404 (Not Found)
     */
    @GetMapping("/sistemas/{id}")
    public ResponseEntity<Sistema> getSistema(@PathVariable Long id) {
        log.debug("REST request to get Sistema : {}", id);
        Optional<Sistema> sistema = sistemaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(sistema);
    }

    /**
     * DELETE  /sistemas/:id : delete the "id" sistema.
     *
     * @param id the id of the sistema to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/sistemas/{id}")
    public ResponseEntity<Void> deleteSistema(@PathVariable Long id) {
        log.debug("REST request to delete Sistema : {}", id);
        sistemaRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
