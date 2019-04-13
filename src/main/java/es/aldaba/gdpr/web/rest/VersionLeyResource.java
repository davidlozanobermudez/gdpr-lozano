package es.aldaba.gdpr.web.rest;
import es.aldaba.gdpr.domain.VersionLey;
import es.aldaba.gdpr.repository.VersionLeyRepository;
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
 * REST controller for managing VersionLey.
 */
@RestController
@RequestMapping("/api")
public class VersionLeyResource {

    private final Logger log = LoggerFactory.getLogger(VersionLeyResource.class);

    private static final String ENTITY_NAME = "versionLey";

    private final VersionLeyRepository versionLeyRepository;

    public VersionLeyResource(VersionLeyRepository versionLeyRepository) {
        this.versionLeyRepository = versionLeyRepository;
    }

    /**
     * POST  /version-leys : Create a new versionLey.
     *
     * @param versionLey the versionLey to create
     * @return the ResponseEntity with status 201 (Created) and with body the new versionLey, or with status 400 (Bad Request) if the versionLey has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/version-leys")
    public ResponseEntity<VersionLey> createVersionLey(@RequestBody VersionLey versionLey) throws URISyntaxException {
        log.debug("REST request to save VersionLey : {}", versionLey);
        if (versionLey.getId() != null) {
            throw new BadRequestAlertException("A new versionLey cannot already have an ID", ENTITY_NAME, "idexists");
        }
        VersionLey result = versionLeyRepository.save(versionLey);
        return ResponseEntity.created(new URI("/api/version-leys/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /version-leys : Updates an existing versionLey.
     *
     * @param versionLey the versionLey to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated versionLey,
     * or with status 400 (Bad Request) if the versionLey is not valid,
     * or with status 500 (Internal Server Error) if the versionLey couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/version-leys")
    public ResponseEntity<VersionLey> updateVersionLey(@RequestBody VersionLey versionLey) throws URISyntaxException {
        log.debug("REST request to update VersionLey : {}", versionLey);
        if (versionLey.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        VersionLey result = versionLeyRepository.save(versionLey);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, versionLey.getId().toString()))
            .body(result);
    }

    /**
     * GET  /version-leys : get all the versionLeys.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of versionLeys in body
     */
    @GetMapping("/version-leys")
    public List<VersionLey> getAllVersionLeys() {
        log.debug("REST request to get all VersionLeys");
        return versionLeyRepository.findAll();
    }

    /**
     * GET  /version-leys/:id : get the "id" versionLey.
     *
     * @param id the id of the versionLey to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the versionLey, or with status 404 (Not Found)
     */
    @GetMapping("/version-leys/{id}")
    public ResponseEntity<VersionLey> getVersionLey(@PathVariable Long id) {
        log.debug("REST request to get VersionLey : {}", id);
        Optional<VersionLey> versionLey = versionLeyRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(versionLey);
    }

    /**
     * DELETE  /version-leys/:id : delete the "id" versionLey.
     *
     * @param id the id of the versionLey to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/version-leys/{id}")
    public ResponseEntity<Void> deleteVersionLey(@PathVariable Long id) {
        log.debug("REST request to delete VersionLey : {}", id);
        versionLeyRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
