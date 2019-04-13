package es.aldaba.gdpr.repository;

import es.aldaba.gdpr.domain.TrazaPeticion;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TrazaPeticion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TrazaPeticionRepository extends JpaRepository<TrazaPeticion, Long> {

}
