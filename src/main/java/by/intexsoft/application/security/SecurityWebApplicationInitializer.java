package by.intexsoft.application.security;

import org.springframework.core.annotation.Order;
import org.springframework.security.web.context.AbstractSecurityWebApplicationInitializer;
import org.springframework.web.filter.DelegatingFilterProxy;
import org.springframework.web.WebApplicationInitializer;

import by.intexsoft.application.config.WebSecurityConfiguration;

/**
 * Registers the {@link DelegatingFilterProxy} bean which delegates all filtering work
 * to a 'springSecurityFilterChain' bean implicitly created with the help of
 * {@link WebSecurityConfiguration} class.
 * This class is auto-detected by Spring due to inheritance chain which eventually
 * implements {@link WebApplicationInitializer} interface.
 */
public class SecurityWebApplicationInitializer extends AbstractSecurityWebApplicationInitializer {
}