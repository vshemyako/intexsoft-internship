package by.intexsoft.application.config;

import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;

/**
 * Java-based deployment descriptor which extends abstract class
 * {@link AbstractAnnotationConfigDispatcherServletInitializer} and provides
 * implementations of inherited abstract methods specifying configuration
 * classes for application context, servlet context and security context.<br>
 * Also mapping to "/api/*" URL is provided
 */

public class DeploymentDescriptorConfiguration extends
        AbstractAnnotationConfigDispatcherServletInitializer {

    @Override
    protected Class<?>[] getRootConfigClasses() {
        return new Class<?>[]{WebSecurityConfiguration.class, RootApplicationContextConfiguration.class};
    }

    @Override
    protected Class<?>[] getServletConfigClasses() {
        return new Class<?>[]{DispatcherServletContextConfiguration.class};
    }

    @Override
    protected String[] getServletMappings() {
        return new String[]{"/api/*"};
    }
}
