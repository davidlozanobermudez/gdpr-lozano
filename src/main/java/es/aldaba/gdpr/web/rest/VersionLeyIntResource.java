package es.aldaba.gdpr.web.rest;
import es.aldaba.gdpr.domain.VersionLeyInt;
import es.aldaba.gdpr.repository.VersionLeyIntRepository;
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
 * REST controller for managing VersionLeyInt.
 */
@RestController
@RequestMapping("/api")
public class VersionLeyIntResource {

    private final Logger log = LoggerFactory.getLogger(VersionLeyIntResource.class);

    private static final String ENTITY_NAME = "versionLeyInt";

    private final VersionLeyIntRepository versionLeyIntRepository;

    public VersionLeyIntResource(VersionLeyIntRepository versionLeyIntRepository) {
        this.versionLeyIntRepository = versionLeyIntRepository;
    }

    /**
     * POST  /version-ley-ints : Create a new versionLeyInt.
     *
     * @param versionLeyInt the versionLeyInt to create
     * @return the ResponseEntity with status 201 (Created) and with body the new versionLeyInt, or with status 400 (Bad Request) if the versionLeyInt has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/version-ley-ints")
    public ResponseEntity<VersionLeyInt> createVersionLeyInt(@RequestBody VersionLeyInt versionLeyInt) throws URISyntaxException {
        log.debug("REST request to save VersionLeyInt : {}", versionLeyInt);
        if (versionLeyInt.getId() != null) {
            throw new BadRequestAlertException("A new versionLeyInt cannot already have an ID", ENTITY_NAME, "idexists");
        }
        VersionLeyInt result = versionLeyIntRepository.save(versionLeyInt);
        return ResponseEntity.created(new URI("/api/version-ley-ints/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /version-ley-ints : Updates an existing versionLeyInt.
     *
     * @param versionLeyInt the versionLeyInt to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated versionLeyInt,
     * or with status 400 (Bad Request) if the versionLeyInt is not valid,
     * or with status 500 (Internal Server Error) if the versionLeyInt couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/version-ley-ints")
    public ResponseEntity<VersionLeyInt> updateVersionLeyInt(@RequestBody VersionLeyInt versionLeyInt) throws URISyntaxException {
        log.debug("REST request to update VersionLeyInt : {}", versionLeyInt);
        if (versionLeyInt.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        VersionLeyInt result = versionLeyIntRepository.save(versionLeyInt);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, versionLeyInt.getId().toString()))
            .body(result);
    }

    /**
     * GET  /version-ley-ints : get all the versionLeyInts.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of versionLeyInts in body
     */
    @GetMapping("/version-ley-ints")
    public List<VersionLeyInt> getAllVersionLeyInts() {
        log.debug("REST request to get all VersionLeyInts");
        return versionLeyIntRepository.findAll();
    }

    /**
     * GET  /version-ley-ints/:id : get the "id" versionLeyInt.
     *
     * @param id the id of the versionLeyInt to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the versionLeyInt, or with status 404 (Not Found)
     */
    @GetMapping("/version-ley-ints/{id}")
    public ResponseEntity<VersionLeyInt> getVersionLeyInt(@PathVariable Long id) {
        log.debug("REST request to get VersionLeyInt : {}", id);
        Optional<VersionLeyInt> versionLeyInt = versionLeyIntRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(versionLeyInt);
    }

    /**
     * DELETE  /version-ley-ints/:id : delete the "id" versionLeyInt.
     *
     * @param id the id of the versionLeyInt to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/version-ley-ints/{id}")
    public ResponseEntity<Void> deleteVersionLeyInt(@PathVariable Long id) {
        log.debug("REST request to delete VersionLeyInt : {}", id);
        versionLeyIntRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
