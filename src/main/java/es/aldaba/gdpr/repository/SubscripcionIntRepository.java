package es.aldaba.gdpr.repository;

import es.aldaba.gdpr.domain.SubscripcionInt;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the SubscripcionInt entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SubscripcionIntRepository extends JpaRepository<SubscripcionInt, Long> {

}
