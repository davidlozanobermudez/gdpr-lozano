package es.aldaba.gdpr.repository;

import es.aldaba.gdpr.domain.Sistema;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Sistema entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SistemaRepository extends JpaRepository<Sistema, Long> {

}
