package es.aldaba.gdpr.repository;

import es.aldaba.gdpr.domain.TipoLey;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TipoLey entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TipoLeyRepository extends JpaRepository<TipoLey, Long> {

}
