package es.aldaba.gdpr.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A ContactoSubscripcion.
 */
@Entity
@Table(name = "contacto_subscripcion")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ContactoSubscripcion implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "fecha")
    private Instant fecha;

    @ManyToOne
    @JsonIgnoreProperties("subscripcionesContactos")
    private Contacto contacto;

    @ManyToOne
    @JsonIgnoreProperties("subscripcionesContactos")
    private Subscripcion subscripcion;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getFecha() {
        return fecha;
    }

    public ContactoSubscripcion fecha(Instant fecha) {
        this.fecha = fecha;
        return this;
    }

    public void setFecha(Instant fecha) {
        this.fecha = fecha;
    }

    public Contacto getContacto() {
        return contacto;
    }

    public ContactoSubscripcion contacto(Contacto contacto) {
        this.contacto = contacto;
        return this;
    }

    public void setContacto(Contacto contacto) {
        this.contacto = contacto;
    }

    public Subscripcion getSubscripcion() {
        return subscripcion;
    }

    public ContactoSubscripcion subscripcion(Subscripcion subscripcion) {
        this.subscripcion = subscripcion;
        return this;
    }

    public void setSubscripcion(Subscripcion subscripcion) {
        this.subscripcion = subscripcion;
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
        ContactoSubscripcion contactoSubscripcion = (ContactoSubscripcion) o;
        if (contactoSubscripcion.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), contactoSubscripcion.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ContactoSubscripcion{" +
            "id=" + getId() +
            ", fecha='" + getFecha() + "'" +
            "}";
    }
}
