package es.aldaba.gdpr.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A AceptaLey.
 */
@Entity
@Table(name = "acepta_ley")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class AceptaLey implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "enviada", nullable = false)
    private Boolean enviada;

    @Column(name = "fecha_envio")
    private Instant fechaEnvio;

    @Column(name = "aceptada")
    private Boolean aceptada;

    @Column(name = "fecha_aceptacion")
    private Instant fechaAceptacion;

    @ManyToOne
    @JsonIgnoreProperties("aceptacionesLeys")
    private Contacto contacto;

    @ManyToOne
    @JsonIgnoreProperties("aceptacionesLeys")
    private VersionLey versionLey;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isEnviada() {
        return enviada;
    }

    public AceptaLey enviada(Boolean enviada) {
        this.enviada = enviada;
        return this;
    }

    public void setEnviada(Boolean enviada) {
        this.enviada = enviada;
    }

    public Instant getFechaEnvio() {
        return fechaEnvio;
    }

    public AceptaLey fechaEnvio(Instant fechaEnvio) {
        this.fechaEnvio = fechaEnvio;
        return this;
    }

    public void setFechaEnvio(Instant fechaEnvio) {
        this.fechaEnvio = fechaEnvio;
    }

    public Boolean isAceptada() {
        return aceptada;
    }

    public AceptaLey aceptada(Boolean aceptada) {
        this.aceptada = aceptada;
        return this;
    }

    public void setAceptada(Boolean aceptada) {
        this.aceptada = aceptada;
    }

    public Instant getFechaAceptacion() {
        return fechaAceptacion;
    }

    public AceptaLey fechaAceptacion(Instant fechaAceptacion) {
        this.fechaAceptacion = fechaAceptacion;
        return this;
    }

    public void setFechaAceptacion(Instant fechaAceptacion) {
        this.fechaAceptacion = fechaAceptacion;
    }

    public Contacto getContacto() {
        return contacto;
    }

    public AceptaLey contacto(Contacto contacto) {
        this.contacto = contacto;
        return this;
    }

    public void setContacto(Contacto contacto) {
        this.contacto = contacto;
    }

    public VersionLey getVersionLey() {
        return versionLey;
    }

    public AceptaLey versionLey(VersionLey versionLey) {
        this.versionLey = versionLey;
        return this;
    }

    public void setVersionLey(VersionLey versionLey) {
        this.versionLey = versionLey;
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
        AceptaLey aceptaLey = (AceptaLey) o;
        if (aceptaLey.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), aceptaLey.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AceptaLey{" +
            "id=" + getId() +
            ", enviada='" + isEnviada() + "'" +
            ", fechaEnvio='" + getFechaEnvio() + "'" +
            ", aceptada='" + isAceptada() + "'" +
            ", fechaAceptacion='" + getFechaAceptacion() + "'" +
            "}";
    }
}
