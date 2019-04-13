package es.aldaba.gdpr.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Agrupacion.
 */
@Entity
@Table(name = "agrupacion")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Agrupacion implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "codigo")
    private String codigo;

    @Column(name = "nombre")
    private String nombre;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "agrupacion_leyes",
               joinColumns = @JoinColumn(name = "agrupacion_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "leyes_id", referencedColumnName = "id"))
    private Set<Ley> leyes = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("agrupacions")
    private Operacion operaciones;

    @ManyToMany(mappedBy = "agrupaciones")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Contacto> contactos = new HashSet<>();

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

    public Agrupacion codigo(String codigo) {
        this.codigo = codigo;
        return this;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getNombre() {
        return nombre;
    }

    public Agrupacion nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Set<Ley> getLeyes() {
        return leyes;
    }

    public Agrupacion leyes(Set<Ley> leys) {
        this.leyes = leys;
        return this;
    }

    public Agrupacion addLeyes(Ley ley) {
        this.leyes.add(ley);
        ley.getAgrupaciones().add(this);
        return this;
    }

    public Agrupacion removeLeyes(Ley ley) {
        this.leyes.remove(ley);
        ley.getAgrupaciones().remove(this);
        return this;
    }

    public void setLeyes(Set<Ley> leys) {
        this.leyes = leys;
    }

    public Operacion getOperaciones() {
        return operaciones;
    }

    public Agrupacion operaciones(Operacion operacion) {
        this.operaciones = operacion;
        return this;
    }

    public void setOperaciones(Operacion operacion) {
        this.operaciones = operacion;
    }

    public Set<Contacto> getContactos() {
        return contactos;
    }

    public Agrupacion contactos(Set<Contacto> contactos) {
        this.contactos = contactos;
        return this;
    }

    public Agrupacion addContactos(Contacto contacto) {
        this.contactos.add(contacto);
        contacto.getAgrupaciones().add(this);
        return this;
    }

    public Agrupacion removeContactos(Contacto contacto) {
        this.contactos.remove(contacto);
        contacto.getAgrupaciones().remove(this);
        return this;
    }

    public void setContactos(Set<Contacto> contactos) {
        this.contactos = contactos;
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
        Agrupacion agrupacion = (Agrupacion) o;
        if (agrupacion.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), agrupacion.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Agrupacion{" +
            "id=" + getId() +
            ", codigo='" + getCodigo() + "'" +
            ", nombre='" + getNombre() + "'" +
            "}";
    }
}
