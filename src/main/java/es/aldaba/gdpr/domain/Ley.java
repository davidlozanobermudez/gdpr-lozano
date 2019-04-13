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

import es.aldaba.gdpr.domain.enumeration.Tipologia;

/**
 * A Ley.
 */
@Entity
@Table(name = "ley")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Ley implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "codigo")
    private String codigo;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipologia")
    private Tipologia tipologia;

    @Column(name = "requiere_anonimizacion")
    private Boolean requiereAnonimizacion;

    @Column(name = "plazo_anonimizado")
    private Integer plazoAnonimizado;

    @Column(name = "aplica_a_pais")
    private Boolean aplicaAPais;

    @Column(name = "cod_pais")
    private String codPais;

    @ManyToOne
    @JsonIgnoreProperties("leyes")
    private TipoLey tipoLey;

    @OneToMany(mappedBy = "ley")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<VersionLey> versiones = new HashSet<>();
    @ManyToMany(mappedBy = "leyes")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Agrupacion> agrupaciones = new HashSet<>();

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

    public Ley codigo(String codigo) {
        this.codigo = codigo;
        return this;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public Tipologia getTipologia() {
        return tipologia;
    }

    public Ley tipologia(Tipologia tipologia) {
        this.tipologia = tipologia;
        return this;
    }

    public void setTipologia(Tipologia tipologia) {
        this.tipologia = tipologia;
    }

    public Boolean isRequiereAnonimizacion() {
        return requiereAnonimizacion;
    }

    public Ley requiereAnonimizacion(Boolean requiereAnonimizacion) {
        this.requiereAnonimizacion = requiereAnonimizacion;
        return this;
    }

    public void setRequiereAnonimizacion(Boolean requiereAnonimizacion) {
        this.requiereAnonimizacion = requiereAnonimizacion;
    }

    public Integer getPlazoAnonimizado() {
        return plazoAnonimizado;
    }

    public Ley plazoAnonimizado(Integer plazoAnonimizado) {
        this.plazoAnonimizado = plazoAnonimizado;
        return this;
    }

    public void setPlazoAnonimizado(Integer plazoAnonimizado) {
        this.plazoAnonimizado = plazoAnonimizado;
    }

    public Boolean isAplicaAPais() {
        return aplicaAPais;
    }

    public Ley aplicaAPais(Boolean aplicaAPais) {
        this.aplicaAPais = aplicaAPais;
        return this;
    }

    public void setAplicaAPais(Boolean aplicaAPais) {
        this.aplicaAPais = aplicaAPais;
    }

    public String getCodPais() {
        return codPais;
    }

    public Ley codPais(String codPais) {
        this.codPais = codPais;
        return this;
    }

    public void setCodPais(String codPais) {
        this.codPais = codPais;
    }

    public TipoLey getTipoLey() {
        return tipoLey;
    }

    public Ley tipoLey(TipoLey tipoLey) {
        this.tipoLey = tipoLey;
        return this;
    }

    public void setTipoLey(TipoLey tipoLey) {
        this.tipoLey = tipoLey;
    }

    public Set<VersionLey> getVersiones() {
        return versiones;
    }

    public Ley versiones(Set<VersionLey> versionLeys) {
        this.versiones = versionLeys;
        return this;
    }

    public Ley addVersiones(VersionLey versionLey) {
        this.versiones.add(versionLey);
        versionLey.setLey(this);
        return this;
    }

    public Ley removeVersiones(VersionLey versionLey) {
        this.versiones.remove(versionLey);
        versionLey.setLey(null);
        return this;
    }

    public void setVersiones(Set<VersionLey> versionLeys) {
        this.versiones = versionLeys;
    }

    public Set<Agrupacion> getAgrupaciones() {
        return agrupaciones;
    }

    public Ley agrupaciones(Set<Agrupacion> agrupacions) {
        this.agrupaciones = agrupacions;
        return this;
    }

    public Ley addAgrupaciones(Agrupacion agrupacion) {
        this.agrupaciones.add(agrupacion);
        agrupacion.getLeyes().add(this);
        return this;
    }

    public Ley removeAgrupaciones(Agrupacion agrupacion) {
        this.agrupaciones.remove(agrupacion);
        agrupacion.getLeyes().remove(this);
        return this;
    }

    public void setAgrupaciones(Set<Agrupacion> agrupacions) {
        this.agrupaciones = agrupacions;
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
        Ley ley = (Ley) o;
        if (ley.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), ley.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Ley{" +
            "id=" + getId() +
            ", codigo='" + getCodigo() + "'" +
            ", tipologia='" + getTipologia() + "'" +
            ", requiereAnonimizacion='" + isRequiereAnonimizacion() + "'" +
            ", plazoAnonimizado=" + getPlazoAnonimizado() +
            ", aplicaAPais='" + isAplicaAPais() + "'" +
            ", codPais='" + getCodPais() + "'" +
            "}";
    }
}
