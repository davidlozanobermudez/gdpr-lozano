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
 * A Language.
 */
@Entity
@Table(name = "language")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Language implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "cod_language")
    private String codLanguage;

    @Column(name = "cod_region")
    private String codRegion;

    @Column(name = "default_language")
    private Boolean defaultLanguage;

    @OneToMany(mappedBy = "language")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<VersionLeyInt> versionLeyInts = new HashSet<>();
    @OneToMany(mappedBy = "language")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<SubscripcionInt> subscripcionInts = new HashSet<>();
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

    public Language codLanguage(String codLanguage) {
        this.codLanguage = codLanguage;
        return this;
    }

    public void setCodLanguage(String codLanguage) {
        this.codLanguage = codLanguage;
    }

    public String getCodRegion() {
        return codRegion;
    }

    public Language codRegion(String codRegion) {
        this.codRegion = codRegion;
        return this;
    }

    public void setCodRegion(String codRegion) {
        this.codRegion = codRegion;
    }

    public Boolean isDefaultLanguage() {
        return defaultLanguage;
    }

    public Language defaultLanguage(Boolean defaultLanguage) {
        this.defaultLanguage = defaultLanguage;
        return this;
    }

    public void setDefaultLanguage(Boolean defaultLanguage) {
        this.defaultLanguage = defaultLanguage;
    }

    public Set<VersionLeyInt> getVersionLeyInts() {
        return versionLeyInts;
    }

    public Language versionLeyInts(Set<VersionLeyInt> versionLeyInts) {
        this.versionLeyInts = versionLeyInts;
        return this;
    }

    public Language addVersionLeyInt(VersionLeyInt versionLeyInt) {
        this.versionLeyInts.add(versionLeyInt);
        versionLeyInt.setLanguage(this);
        return this;
    }

    public Language removeVersionLeyInt(VersionLeyInt versionLeyInt) {
        this.versionLeyInts.remove(versionLeyInt);
        versionLeyInt.setLanguage(null);
        return this;
    }

    public void setVersionLeyInts(Set<VersionLeyInt> versionLeyInts) {
        this.versionLeyInts = versionLeyInts;
    }

    public Set<SubscripcionInt> getSubscripcionInts() {
        return subscripcionInts;
    }

    public Language subscripcionInts(Set<SubscripcionInt> subscripcionInts) {
        this.subscripcionInts = subscripcionInts;
        return this;
    }

    public Language addSubscripcionInt(SubscripcionInt subscripcionInt) {
        this.subscripcionInts.add(subscripcionInt);
        subscripcionInt.setLanguage(this);
        return this;
    }

    public Language removeSubscripcionInt(SubscripcionInt subscripcionInt) {
        this.subscripcionInts.remove(subscripcionInt);
        subscripcionInt.setLanguage(null);
        return this;
    }

    public void setSubscripcionInts(Set<SubscripcionInt> subscripcionInts) {
        this.subscripcionInts = subscripcionInts;
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
        Language language = (Language) o;
        if (language.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), language.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Language{" +
            "id=" + getId() +
            ", codLanguage='" + getCodLanguage() + "'" +
            ", codRegion='" + getCodRegion() + "'" +
            ", defaultLanguage='" + isDefaultLanguage() + "'" +
            "}";
    }
}
