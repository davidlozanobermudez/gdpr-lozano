package es.aldaba.gdpr.repository;

import es.aldaba.gdpr.domain.AceptaLey;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the AceptaLey entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AceptaLeyRepository extends JpaRepository<AceptaLey, Long> {

}
