package es.aldaba.gdpr.repository;

import es.aldaba.gdpr.domain.VersionLeyInt;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the VersionLeyInt entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VersionLeyIntRepository extends JpaRepository<VersionLeyInt, Long> {

}
