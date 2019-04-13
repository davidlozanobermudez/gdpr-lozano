package es.aldaba.gdpr.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import es.aldaba.gdpr.domain.enumeration.TipoOperacion;

/**
 * A Operacion.
 */
@Entity
@Table(name = "operacion")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Operacion implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "codigo")
    private String codigo;

    @Column(name = "ws_asociado")
    private String wsAsociado;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo")
    private TipoOperacion tipo;

    @OneToMany(mappedBy = "operaciones")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Sistema> sistemas = new HashSet<>();
    @OneToMany(mappedBy = "operaciones")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Agrupacion> agrupacions = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodigo() {
        return codigo;
    }

    public Operacion codigo(String codigo) {
        this.codigo = codigo;
        return this;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getWsAsociado() {
        return wsAsociado;
    }

    public Operacion wsAsociado(String wsAsociado) {
        this.wsAsociado = wsAsociado;
        return this;
    }

    public void setWsAsociado(String wsAsociado) {
        this.wsAsociado = wsAsociado;
    }

    public TipoOperacion getTipo() {
        return tipo;
    }

    public Operacion tipo(TipoOperacion tipo) {
        this.tipo = tipo;
        return this;
    }

    public void setTipo(TipoOperacion tipo) {
        this.tipo = tipo;
    }

    public Set<Sistema> getSistemas() {
        return sistemas;
    }

    public Operacion sistemas(Set<Sistema> sistemas) {
        this.sistemas = sistemas;
        return this;
    }

    public Operacion addSistema(Sistema sistema) {
        this.sistemas.add(sistema);
        sistema.setOperaciones(this);
        return this;
    }

    public Operacion removeSistema(Sistema sistema) {
        this.sistemas.remove(sistema);
        sistema.setOperaciones(null);
        return this;
    }

    public void setSistemas(Set<Sistema> sistemas) {
        this.sistemas = sistemas;
    }

    public Set<Agrupacion> getAgrupacions() {
        return agrupacions;
    }

    public Operacion agrupacions(Set<Agrupacion> agrupacions) {
        this.agrupacions = agrupacions;
        return this;
    }

    public Operacion addAgrupacion(Agrupacion agrupacion) {
        this.agrupacions.add(agrupacion);
        agrupacion.setOperaciones(this);
        return this;
    }

    public Operacion removeAgrupacion(Agrupacion agrupacion) {
        this.agrupacions.remove(agrupacion);
        agrupacion.setOperaciones(null);
        return this;
    }

    public void setAgrupacions(Set<Agrupacion> agrupacions) {
        this.agrupacions = agrupacions;
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
        Operacion operacion = (Operacion) o;
        if (operacion.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), operacion.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Operacion{" +
            "id=" + getId() +
            ", codigo='" + getCodigo() + "'" +
            ", wsAsociado='" + getWsAsociado() + "'" +
            ", tipo='" + getTipo() + "'" +
            "}";
    }
}
