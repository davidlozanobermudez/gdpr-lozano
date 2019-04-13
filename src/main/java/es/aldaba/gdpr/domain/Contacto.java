package es.aldaba.gdpr.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import es.aldaba.gdpr.domain.enumeration.StatusContacto;

/**
 * A Contacto.
 */
@Entity
@Table(name = "contacto")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Contacto implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "id_cuenta")
    private String idCuenta;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private StatusContacto status;

    @Column(name = "email")
    private String email;

    @Column(name = "telefono")
    private String telefono;

    @Column(name = "cod_pais")
    private String codPais;

    @Column(name = "cod_idoma")
    private String codIdoma;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "contacto_agrupaciones",
               joinColumns = @JoinColumn(name = "contacto_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "agrupaciones_id", referencedColumnName = "id"))
    private Set<Agrupacion> agrupaciones = new HashSet<>();

    @OneToMany(mappedBy = "contacto")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ContactoSubscripcion> subscripcionesContactos = new HashSet<>();
    @OneToMany(mappedBy = "contacto")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<AceptaLey> aceptacionesLeys = new HashSet<>();
    @OneToMany(mappedBy = "contacto")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<TrazaPeticion> trazasPeticions = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIdCuenta() {
        return idCuenta;
    }

    public Contacto idCuenta(String idCuenta) {
        this.idCuenta = idCuenta;
        return this;
    }

    public void setIdCuenta(String idCuenta) {
        this.idCuenta = idCuenta;
    }

    public StatusContacto getStatus() {
        return status;
    }

    public Contacto status(StatusContacto status) {
        this.status = status;
        return this;
    }

    public void setStatus(StatusContacto status) {
        this.status = status;
    }

    public String getEmail() {
        return email;
    }

    public Contacto email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelefono() {
        return telefono;
    }

    public Contacto telefono(String telefono) {
        this.telefono = telefono;
        return this;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getCodPais() {
        return codPais;
    }

    public Contacto codPais(String codPais) {
        this.codPais = codPais;
        return this;
    }

    public void setCodPais(String codPais) {
        this.codPais = codPais;
    }

    public String getCodIdoma() {
        return codIdoma;
    }

    public Contacto codIdoma(String codIdoma) {
        this.codIdoma = codIdoma;
        return this;
    }

    public void setCodIdoma(String codIdoma) {
        this.codIdoma = codIdoma;
    }

    public Set<Agrupacion> getAgrupaciones() {
        return agrupaciones;
    }

    public Contacto agrupaciones(Set<Agrupacion> agrupacions) {
        this.agrupaciones = agrupacions;
        return this;
    }

    public Contacto addAgrupaciones(Agrupacion agrupacion) {
        this.agrupaciones.add(agrupacion);
        agrupacion.getContactos().add(this);
        return this;
    }

    public Contacto removeAgrupaciones(Agrupacion agrupacion) {
        this.agrupaciones.remove(agrupacion);
        agrupacion.getContactos().remove(this);
        return this;
    }

    public void setAgrupaciones(Set<Agrupacion> agrupacions) {
        this.agrupaciones = agrupacions;
    }

    public Set<ContactoSubscripcion> getSubscripcionesContactos() {
        return subscripcionesContactos;
    }

    public Contacto subscripcionesContactos(Set<ContactoSubscripcion> contactoSubscripcions) {
        this.subscripcionesContactos = contactoSubscripcions;
        return this;
    }

    public Contacto addSubscripcionesContacto(ContactoSubscripcion contactoSubscripcion) {
        this.subscripcionesContactos.add(contactoSubscripcion);
        contactoSubscripcion.setContacto(this);
        return this;
    }

    public Contacto removeSubscripcionesContacto(ContactoSubscripcion contactoSubscripcion) {
        this.subscripcionesContactos.remove(contactoSubscripcion);
        contactoSubscripcion.setContacto(null);
        return this;
    }

    public void setSubscripcionesContactos(Set<ContactoSubscripcion> contactoSubscripcions) {
        this.subscripcionesContactos = contactoSubscripcions;
    }

    public Set<AceptaLey> getAceptacionesLeys() {
        return aceptacionesLeys;
    }

    public Contacto aceptacionesLeys(Set<AceptaLey> aceptaLeys) {
        this.aceptacionesLeys = aceptaLeys;
        return this;
    }

    public Contacto addAceptacionesLey(AceptaLey aceptaLey) {
        this.aceptacionesLeys.add(aceptaLey);
        aceptaLey.setContacto(this);
        return this;
    }

    public Contacto removeAceptacionesLey(AceptaLey aceptaLey) {
        this.aceptacionesLeys.remove(aceptaLey);
        aceptaLey.setContacto(null);
        return this;
    }

    public void setAceptacionesLeys(Set<AceptaLey> aceptaLeys) {
        this.aceptacionesLeys = aceptaLeys;
    }

    public Set<TrazaPeticion> getTrazasPeticions() {
        return trazasPeticions;
    }

    public Contacto trazasPeticions(Set<TrazaPeticion> trazaPeticions) {
        this.trazasPeticions = trazaPeticions;
        return this;
    }

    public Contacto addTrazasPeticion(TrazaPeticion trazaPeticion) {
        this.trazasPeticions.add(trazaPeticion);
        trazaPeticion.setContacto(this);
        return this;
    }

    public Contacto removeTrazasPeticion(TrazaPeticion trazaPeticion) {
        this.trazasPeticions.remove(trazaPeticion);
        trazaPeticion.setContacto(null);
        return this;
    }

    public void setTrazasPeticions(Set<TrazaPeticion> trazaPeticions) {
        this.trazasPeticions = trazaPeticions;
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
        Contacto contacto = (Contacto) o;
        if (contacto.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), contacto.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Contacto{" +
            "id=" + getId() +
            ", idCuenta='" + getIdCuenta() + "'" +
            ", status='" + getStatus() + "'" +
            ", email='" + getEmail() + "'" +
            ", telefono='" + getTelefono() + "'" +
            ", codPais='" + getCodPais() + "'" +
            ", codIdoma='" + getCodIdoma() + "'" +
            "}";
    }
}
