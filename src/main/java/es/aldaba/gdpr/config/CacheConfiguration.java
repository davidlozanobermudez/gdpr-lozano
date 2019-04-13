package es.aldaba.gdpr.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import io.github.jhipster.config.jcache.BeanClassLoaderAwareJCacheRegionFactory;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        BeanClassLoaderAwareJCacheRegionFactory.setBeanClassLoader(this.getClass().getClassLoader());
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(es.aldaba.gdpr.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(es.aldaba.gdpr.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(es.aldaba.gdpr.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(es.aldaba.gdpr.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(es.aldaba.gdpr.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(es.aldaba.gdpr.domain.Language.class.getName(), jcacheConfiguration);
            cm.createCache(es.aldaba.gdpr.domain.Language.class.getName() + ".versionLeyInts", jcacheConfiguration);
            cm.createCache(es.aldaba.gdpr.domain.Language.class.getName() + ".subscripcionInts", jcacheConfiguration);
            cm.createCache(es.aldaba.gdpr.domain.Sistema.class.getName(), jcacheConfiguration);
            cm.createCache(es.aldaba.gdpr.domain.Agrupacion.class.getName(), jcacheConfiguration);
            cm.createCache(es.aldaba.gdpr.domain.Agrupacion.class.getName() + ".leyes", jcacheConfiguration);
            cm.createCache(es.aldaba.gdpr.domain.Agrupacion.class.getName() + ".contactos", jcacheConfiguration);
            cm.createCache(es.aldaba.gdpr.domain.Operacion.class.getName(), jcacheConfiguration);
            cm.createCache(es.aldaba.gdpr.domain.Operacion.class.getName() + ".sistemas", jcacheConfiguration);
            cm.createCache(es.aldaba.gdpr.domain.Operacion.class.getName() + ".agrupacions", jcacheConfiguration);
            cm.createCache(es.aldaba.gdpr.domain.TipoLey.class.getName(), jcacheConfiguration);
            cm.createCache(es.aldaba.gdpr.domain.TipoLey.class.getName() + ".leyes", jcacheConfiguration);
            cm.createCache(es.aldaba.gdpr.domain.Ley.class.getName(), jcacheConfiguration);
            cm.createCache(es.aldaba.gdpr.domain.Ley.class.getName() + ".versiones", jcacheConfiguration);
            cm.createCache(es.aldaba.gdpr.domain.Ley.class.getName() + ".agrupaciones", jcacheConfiguration);
            cm.createCache(es.aldaba.gdpr.domain.VersionLey.class.getName(), jcacheConfiguration);
            cm.createCache(es.aldaba.gdpr.domain.VersionLey.class.getName() + ".langs", jcacheConfiguration);
            cm.createCache(es.aldaba.gdpr.domain.VersionLey.class.getName() + ".aceptacionesLeys", jcacheConfiguration);
            cm.createCache(es.aldaba.gdpr.domain.VersionLeyInt.class.getName(), jcacheConfiguration);
            cm.createCache(es.aldaba.gdpr.domain.Subscripcion.class.getName(), jcacheConfiguration);
            cm.createCache(es.aldaba.gdpr.domain.Subscripcion.class.getName() + ".langs", jcacheConfiguration);
            cm.createCache(es.aldaba.gdpr.domain.Subscripcion.class.getName() + ".subscripcionesContactos", jcacheConfiguration);
            cm.createCache(es.aldaba.gdpr.domain.SubscripcionInt.class.getName(), jcacheConfiguration);
            cm.createCache(es.aldaba.gdpr.domain.Contacto.class.getName(), jcacheConfiguration);
            cm.createCache(es.aldaba.gdpr.domain.Contacto.class.getName() + ".agrupaciones", jcacheConfiguration);
            cm.createCache(es.aldaba.gdpr.domain.Contacto.class.getName() + ".subscripcionesContactos", jcacheConfiguration);
            cm.createCache(es.aldaba.gdpr.domain.Contacto.class.getName() + ".aceptacionesLeys", jcacheConfiguration);
            cm.createCache(es.aldaba.gdpr.domain.Contacto.class.getName() + ".trazasPeticions", jcacheConfiguration);
            cm.createCache(es.aldaba.gdpr.domain.ContactoSubscripcion.class.getName(), jcacheConfiguration);
            cm.createCache(es.aldaba.gdpr.domain.AceptaLey.class.getName(), jcacheConfiguration);
            cm.createCache(es.aldaba.gdpr.domain.TrazaPeticion.class.getName(), jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
