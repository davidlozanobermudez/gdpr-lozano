package es.aldaba.gdpr.repository;

import es.aldaba.gdpr.domain.ContactoSubscripcion;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ContactoSubscripcion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ContactoSubscripcionRepository extends JpaRepository<ContactoSubscripcion, Long> {

}
