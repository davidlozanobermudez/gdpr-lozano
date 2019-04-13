package es.aldaba.gdpr.repository;

import es.aldaba.gdpr.domain.Ley;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Ley entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LeyRepository extends JpaRepository<Ley, Long> {

}
