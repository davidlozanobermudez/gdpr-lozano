package es.aldaba.gdpr.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A TipoLey.
 */
@Entity
@Table(name = "tipo_ley")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TipoLey implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "descripcion")
    private String descripcion;

    @OneToMany(mappedBy = "tipoLey")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Ley> leyes = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public TipoLey descripcion(String descripcion) {
        this.descripcion = descripcion;
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Set<Ley> getLeyes() {
        return leyes;
    }

    public TipoLey leyes(Set<Ley> leys) {
        this.leyes = leys;
        return this;
    }

    public TipoLey addLeyes(Ley ley) {
        this.leyes.add(ley);
        ley.setTipoLey(this);
        return this;
    }

    public TipoLey removeLeyes(Ley ley) {
        this.leyes.remove(ley);
        ley.setTipoLey(null);
        return this;
    }

    public void setLeyes(Set<Ley> leys) {
        this.leyes = leys;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        TipoLey tipoLey = (TipoLey) o;
        if (tipoLey.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tipoLey.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TipoLey{" +
            "id=" + getId() +
            ", descripcion='" + getDescripcion() + "'" +
            "}";
    }
}
