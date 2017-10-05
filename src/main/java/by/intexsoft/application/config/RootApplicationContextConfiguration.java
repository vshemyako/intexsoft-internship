package by.intexsoft.application.config;

import org.flywaydb.core.Flyway;
import org.postgresql.ds.PGSimpleDataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.*;
import org.springframework.core.convert.ConversionService;
import org.springframework.core.convert.support.DefaultConversionService;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.web.config.EnableSpringDataWebSupport;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.JpaVendorAdapter;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.data.domain.Pageable;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter;

import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;

/**
 * Annotated with {@link @Configuration} which indicates that a class is purely
 * used for Spring configuration. Several {@link @Bean} methods can be processed
 * by the Spring container.<br>
 * Additional information about utilized annotations:<br>
 * {@link @ComponentScan} defines a package to scan for a component<br>
 * {@link @EnableJpaRepositories} enables the use of Spring Data JPA
 * repositores<br>
 * {@link @PropertySource} provides a declarative mechanism for adding a
 * PropertySource to Spring's Environment. In our particular case it provides
 * database specific information<br>
 * {@link @EnableTransactionManagement} enables transaction management
 * capability<br>
 */
@Configuration
@ComponentScan(basePackages = {"by.intexsoft.application.service", "by.intexsoft.application.security"})
@EnableJpaRepositories("by.intexsoft.application.repository")
@PropertySource("classpath:base.properties")
@EnableTransactionManagement
public class RootApplicationContextConfiguration {

    @Value("${db.hostname}")
    private String hostName;
    @Value("${db.dbname}")
    private String databaseName;
    @Value("${db.user}")
    private String databaseUser;
    @Value("${db.password}")
    private String databasePassword;

    /**
     * Configure a DataSource object
     *
     * @return configured DataSource object which is used for getting a
     * connection to a database
     */
    @Bean
    public DataSource dataSource() {
        PGSimpleDataSource dataSource = new PGSimpleDataSource();
        dataSource.setServerName(hostName);
        dataSource.setDatabaseName(databaseName);
        dataSource.setUser(databaseUser);
        dataSource.setPassword(databasePassword);
        return dataSource;
    }

    /**
     * Configures {@link Flyway} object
     *
     * @return configured {@link Flyway} object for db migration processes
     */
    @Bean
    public Flyway flyway() {
        Flyway flyway = new Flyway();
        flyway.setDataSource(dataSource());
        flyway.setLocations("classpath:/db/migration/");
        flyway.setBaselineOnMigrate(true);
        flyway.migrate();
        return flyway;
    }

    /**
     * Configure a vendor-specific JpaVendorAdapter object. In particular case
     * Hibernate Jpa is used
     *
     * @return configured JpaVendorAdapter which is used for ORM operations
     */
    @Bean
    public JpaVendorAdapter jpaVendorAdapter() {
        HibernateJpaVendorAdapter adapter = new HibernateJpaVendorAdapter();
        adapter.setShowSql(false);
        return adapter;
    }

    /**
     * Create configured @{link EntityManagerFactory} with provided DataSource
     * and JpaVendorAdapter objects. EntityManagerFactory creates an
     * EntityManager instance, which provides functionality for performing
     * operations on a database
     *
     * @param dataSource       - configured {@link DataSource} object
     * @param jpaVendorAdapter - configured {@link JpaVendorAdapter} object
     * @return EntityManagerFactory instance
     */
    @Bean
    @DependsOn("flyway")
    public LocalContainerEntityManagerFactoryBean entityManagerFactory(DataSource dataSource,
                                                                       JpaVendorAdapter jpaVendorAdapter) {
        LocalContainerEntityManagerFactoryBean entityManagerFactory = new LocalContainerEntityManagerFactoryBean();
        entityManagerFactory.setDataSource(dataSource);
        entityManagerFactory.setJpaVendorAdapter(jpaVendorAdapter);
        entityManagerFactory.setPackagesToScan("by.intexsoft.application.model");
        return entityManagerFactory;
    }

    /**
     * Create an instance of {@link PlatformTransactionManager}, which in our
     * case is appropriate for applications that use a single JPA
     * EntityManagerFactory
     *
     * @param entityManagerFactory - configured factory, which produces EntityManager objects
     * @return an instance of a {@link PlatformTransactionManager} for a single
     * JPA {@link EntityManagerFactory}
     */
    @Bean
    public PlatformTransactionManager transactionManager(EntityManagerFactory entityManagerFactory) {
        return new JpaTransactionManager(entityManagerFactory);
    }
}
