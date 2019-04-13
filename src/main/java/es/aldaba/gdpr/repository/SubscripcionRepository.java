package es.aldaba.gdpr.repository;

import es.aldaba.gdpr.domain.Subscripcion;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Subscripcion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SubscripcionRepository extends JpaRepository<Subscripcion, Long> {

}
