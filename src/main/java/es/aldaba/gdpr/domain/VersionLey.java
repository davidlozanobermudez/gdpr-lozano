package es.aldaba.gdpr.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A VersionLey.
 */
@Entity
@Table(name = "version_ley")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class VersionLey implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "version")
    private String version;

    @Column(name = "fecha_desde")
    private LocalDate fechaDesde;

    @OneToMany(mappedBy = "versionLey")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<VersionLeyInt> langs = new HashSet<>();
    @ManyToOne
    @JsonIgnoreProperties("versiones")
    private Ley ley;

    @OneToMany(mappedBy = "versionLey")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<AceptaLey> aceptacionesLeys = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getVersion() {
        return version;
    }

    public VersionLey version(String version) {
        this.version = version;
        return this;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public LocalDate getFechaDesde() {
        return fechaDesde;
    }

    public VersionLey fechaDesde(LocalDate fechaDesde) {
        this.fechaDesde = fechaDesde;
        return this;
    }

    public void setFechaDesde(LocalDate fechaDesde) {
        this.fechaDesde = fechaDesde;
    }

    public Set<VersionLeyInt> getLangs() {
        return langs;
    }

    public VersionLey langs(Set<VersionLeyInt> versionLeyInts) {
        this.langs = versionLeyInts;
        return this;
    }

    public VersionLey addLangs(VersionLeyInt versionLeyInt) {
        this.langs.add(versionLeyInt);
        versionLeyInt.setVersionLey(this);
        return this;
    }

    public VersionLey removeLangs(VersionLeyInt versionLeyInt) {
        this.langs.remove(versionLeyInt);
        versionLeyInt.setVersionLey(null);
        return this;
    }

    public void setLangs(Set<VersionLeyInt> versionLeyInts) {
        this.langs = versionLeyInts;
    }

    public Ley getLey() {
        return ley;
    }

    public VersionLey ley(Ley ley) {
        this.ley = ley;
        return this;
    }

    public void setLey(Ley ley) {
        this.ley = ley;
    }

    public Set<AceptaLey> getAceptacionesLeys() {
        return aceptacionesLeys;
    }

    public VersionLey aceptacionesLeys(Set<AceptaLey> aceptaLeys) {
        this.aceptacionesLeys = aceptaLeys;
        return this;
    }

    public VersionLey addAceptacionesLey(AceptaLey aceptaLey) {
        this.aceptacionesLeys.add(aceptaLey);
        aceptaLey.setVersionLey(this);
        return this;
    }

    public VersionLey removeAceptacionesLey(AceptaLey aceptaLey) {
        this.aceptacionesLeys.remove(aceptaLey);
        aceptaLey.setVersionLey(null);
        return this;
    }

    public void setAceptacionesLeys(Set<AceptaLey> aceptaLeys) {
        this.aceptacionesLeys = aceptaLeys;
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
        VersionLey versionLey = (VersionLey) o;
        if (versionLey.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), versionLey.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "VersionLey{" +
            "id=" + getId() +
            ", version='" + getVersion() + "'" +
            ", fechaDesde='" + getFechaDesde() + "'" +
            "}";
    }
}
