package es.aldaba.gdpr.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

import es.aldaba.gdpr.domain.enumeration.TipoNotificacion;

import es.aldaba.gdpr.domain.enumeration.NombreOperacion;

/**
 * A TrazaPeticion.
 */
@Entity
@Table(name = "traza_peticion")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TrazaPeticion implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_notificacion")
    private TipoNotificacion tipoNotificacion;

    @Enumerated(EnumType.STRING)
    @Column(name = "nombre_operacion")
    private NombreOperacion nombreOperacion;

    @Column(name = "fecha")
    private Instant fecha;

    @Column(name = "observaciones")
    private String observaciones;

    @ManyToOne
    @JsonIgnoreProperties("trazasPeticions")
    private Contacto contacto;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TipoNotificacion getTipoNotificacion() {
        return tipoNotificacion;
    }

    public TrazaPeticion tipoNotificacion(TipoNotificacion tipoNotificacion) {
        this.tipoNotificacion = tipoNotificacion;
        return this;
    }

    public void setTipoNotificacion(TipoNotificacion tipoNotificacion) {
        this.tipoNotificacion = tipoNotificacion;
    }

    public NombreOperacion getNombreOperacion() {
        return nombreOperacion;
    }

    public TrazaPeticion nombreOperacion(NombreOperacion nombreOperacion) {
        this.nombreOperacion = nombreOperacion;
        return this;
    }

    public void setNombreOperacion(NombreOperacion nombreOperacion) {
        this.nombreOperacion = nombreOperacion;
    }

    public Instant getFecha() {
        return fecha;
    }

    public TrazaPeticion fecha(Instant fecha) {
        this.fecha = fecha;
        return this;
    }

    public void setFecha(Instant fecha) {
        this.fecha = fecha;
    }

    public String getObservaciones() {
        return observaciones;
    }

    public TrazaPeticion observaciones(String observaciones) {
        this.observaciones = observaciones;
        return this;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }

    public Contacto getContacto() {
        return contacto;
    }

    public TrazaPeticion contacto(Contacto contacto) {
        this.contacto = contacto;
        return this;
    }

    public void setContacto(Contacto contacto) {
        this.contacto = contacto;
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
        TrazaPeticion trazaPeticion = (TrazaPeticion) o;
        if (trazaPeticion.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), trazaPeticion.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TrazaPeticion{" +
            "id=" + getId() +
            ", tipoNotificacion='" + getTipoNotificacion() + "'" +
            ", nombreOperacion='" + getNombreOperacion() + "'" +
            ", fecha='" + getFecha() + "'" +
            ", observaciones='" + getObservaciones() + "'" +
            "}";
    }
}
