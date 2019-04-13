package es.aldaba.gdpr.repository;

import es.aldaba.gdpr.domain.VersionLey;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the VersionLey entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VersionLeyRepository extends JpaRepository<VersionLey, Long> {

}
