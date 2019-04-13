package es.aldaba.gdpr.repository;

import es.aldaba.gdpr.domain.Agrupacion;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Agrupacion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AgrupacionRepository extends JpaRepository<Agrupacion, Long> {

    @Query(value = "select distinct agrupacion from Agrupacion agrupacion left join fetch agrupacion.leyes",
        countQuery = "select count(distinct agrupacion) from Agrupacion agrupacion")
    Page<Agrupacion> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct agrupacion from Agrupacion agrupacion left join fetch agrupacion.leyes")
    List<Agrupacion> findAllWithEagerRelationships();

    @Query("select agrupacion from Agrupacion agrupacion left join fetch agrupacion.leyes where agrupacion.id =:id")
    Optional<Agrupacion> findOneWithEagerRelationships(@Param("id") Long id);

}
