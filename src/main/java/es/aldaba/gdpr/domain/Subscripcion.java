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
 * A Subscripcion.
 */
@Entity
@Table(name = "subscripcion")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Subscripcion implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "codigo")
    private String codigo;

    @OneToMany(mappedBy = "subscripcion")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<SubscripcionInt> langs = new HashSet<>();
    @OneToMany(mappedBy = "subscripcion")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ContactoSubscripcion> subscripcionesContactos = new HashSet<>();
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

    public Subscripcion codigo(String codigo) {
        this.codigo = codigo;
        return this;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public Set<SubscripcionInt> getLangs() {
        return langs;
    }

    public Subscripcion langs(Set<SubscripcionInt> subscripcionInts) {
        this.langs = subscripcionInts;
        return this;
    }

    public Subscripcion addLangs(SubscripcionInt subscripcionInt) {
        this.langs.add(subscripcionInt);
        subscripcionInt.setSubscripcion(this);
        return this;
    }

    public Subscripcion removeLangs(SubscripcionInt subscripcionInt) {
        this.langs.remove(subscripcionInt);
        subscripcionInt.setSubscripcion(null);
        return this;
    }

    public void setLangs(Set<SubscripcionInt> subscripcionInts) {
        this.langs = subscripcionInts;
    }

    public Set<ContactoSubscripcion> getSubscripcionesContactos() {
        return subscripcionesContactos;
    }

    public Subscripcion subscripcionesContactos(Set<ContactoSubscripcion> contactoSubscripcions) {
        this.subscripcionesContactos = contactoSubscripcions;
        return this;
    }

    public Subscripcion addSubscripcionesContacto(ContactoSubscripcion contactoSubscripcion) {
        this.subscripcionesContactos.add(contactoSubscripcion);
        contactoSubscripcion.setSubscripcion(this);
        return this;
    }

    public Subscripcion removeSubscripcionesContacto(ContactoSubscripcion contactoSubscripcion) {
        this.subscripcionesContactos.remove(contactoSubscripcion);
        contactoSubscripcion.setSubscripcion(null);
        return this;
    }

    public void setSubscripcionesContactos(Set<ContactoSubscripcion> contactoSubscripcions) {
        this.subscripcionesContactos = contactoSubscripcions;
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
        Subscripcion subscripcion = (Subscripcion) o;
        if (subscripcion.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), subscripcion.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Subscripcion{" +
            "id=" + getId() +
            ", codigo='" + getCodigo() + "'" +
            "}";
    }
}
