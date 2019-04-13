package es.aldaba.gdpr.repository;

import es.aldaba.gdpr.domain.Contacto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Contacto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ContactoRepository extends JpaRepository<Contacto, Long> {

    @Query(value = "select distinct contacto from Contacto contacto left join fetch contacto.agrupaciones",
        countQuery = "select count(distinct contacto) from Contacto contacto")
    Page<Contacto> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct contacto from Contacto contacto left join fetch contacto.agrupaciones")
    List<Contacto> findAllWithEagerRelationships();

    @Query("select contacto from Contacto contacto left join fetch contacto.agrupaciones where contacto.id =:id")
    Optional<Contacto> findOneWithEagerRelationships(@Param("id") Long id);

}
