package es.aldaba.gdpr.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A SubscripcionInt.
 */
@Entity
@Table(name = "subscripcion_int")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class SubscripcionInt implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "cod_language")
    private String codLanguage;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "descripcion")
    private String descripcion;

    @ManyToOne
    @JsonIgnoreProperties("langs")
    private Subscripcion subscripcion;

    @ManyToOne
    @JsonIgnoreProperties("subscripcionInts")
    private Language language;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodLanguage() {
        return codLanguage;
    }

    public SubscripcionInt codLanguage(String codLanguage) {
        this.codLanguage = codLanguage;
        return this;
    }

    public void setCodLanguage(String codLanguage) {
        this.codLanguage = codLanguage;
    }

    public String getNombre() {
        return nombre;
    }

    public SubscripcionInt nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public SubscripcionInt descripcion(String descripcion) {
        this.descripcion = descripcion;
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Subscripcion getSubscripcion() {
        return subscripcion;
    }

    public SubscripcionInt subscripcion(Subscripcion subscripcion) {
        this.subscripcion = subscripcion;
        return this;
    }

    public void setSubscripcion(Subscripcion subscripcion) {
        this.subscripcion = subscripcion;
    }

    public Language getLanguage() {
        return language;
    }

    public SubscripcionInt language(Language language) {
        this.language = language;
        return this;
    }

    public void setLanguage(Language language) {
        this.language = language;
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
        SubscripcionInt subscripcionInt = (SubscripcionInt) o;
        if (subscripcionInt.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), subscripcionInt.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SubscripcionInt{" +
            "id=" + getId() +
            ", codLanguage='" + getCodLanguage() + "'" +
            ", nombre='" + getNombre() + "'" +
            ", descripcion='" + getDescripcion() + "'" +
            "}";
    }
}
