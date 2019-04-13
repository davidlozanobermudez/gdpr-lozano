package es.aldaba.gdpr.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A VersionLeyInt.
 */
@Entity
@Table(name = "version_ley_int")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class VersionLeyInt implements Serializable {

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
    private VersionLey versionLey;

    @ManyToOne
    @JsonIgnoreProperties("versionLeyInts")
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

    public VersionLeyInt codLanguage(String codLanguage) {
        this.codLanguage = codLanguage;
        return this;
    }

    public void setCodLanguage(String codLanguage) {
        this.codLanguage = codLanguage;
    }

    public String getNombre() {
        return nombre;
    }

    public VersionLeyInt nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public VersionLeyInt descripcion(String descripcion) {
        this.descripcion = descripcion;
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public VersionLey getVersionLey() {
        return versionLey;
    }

    public VersionLeyInt versionLey(VersionLey versionLey) {
        this.versionLey = versionLey;
        return this;
    }

    public void setVersionLey(VersionLey versionLey) {
        this.versionLey = versionLey;
    }

    public Language getLanguage() {
        return language;
    }

    public VersionLeyInt language(Language language) {
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
        VersionLeyInt versionLeyInt = (VersionLeyInt) o;
        if (versionLeyInt.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), versionLeyInt.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "VersionLeyInt{" +
            "id=" + getId() +
            ", codLanguage='" + getCodLanguage() + "'" +
            ", nombre='" + getNombre() + "'" +
            ", descripcion='" + getDescripcion() + "'" +
            "}";
    }
}
