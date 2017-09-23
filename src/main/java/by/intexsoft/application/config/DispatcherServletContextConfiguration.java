package by.intexsoft.application.config;

import by.intexsoft.application.service.UserService;
import by.intexsoft.application.service.implementations.UserServiceImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.config.EnableSpringDataWebSupport;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

/**
 * Java-based configuration class for a dispatcher servlet context.
 * {@link @EnableWebMvc} configures a list of special bean types the
 * DispatcherServlet relies on
 * {@link @EnableSpringDataWebSupport} is used for auto several beans configuration.
 * In this particular application we are interested in autoconfigured {@link Pageable}
 * instance
 */
@Configuration
@EnableWebMvc
@EnableSpringDataWebSupport
@ComponentScan("by.intexsoft.application.controller")
public class DispatcherServletContextConfiguration {

    /**
     * @return instance of a UserServiceImpl class
     */
    @Bean
    public UserService userService() {
        return new UserServiceImpl();
    }
}
