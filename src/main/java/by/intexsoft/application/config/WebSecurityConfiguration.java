package by.intexsoft.application.config;

import by.intexsoft.application.security.filter.AuthenticationFilter;
import by.intexsoft.application.security.filter.LoginFilter;
import by.intexsoft.application.service.implementations.CustomUserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * Java-based Spring Security configuration class. Implicitly creates an instance
 * of Servlet filter which is known as 'springSecurityFilterChain'.
 */
@Configuration
@EnableWebSecurity
@ComponentScan(basePackageClasses = CustomUserDetailsServiceImpl.class)
public class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {

    private final UserDetailsService userDetailsService;

    @Autowired
    public WebSecurityConfiguration(UserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    /**
     * Overriding was made to customize existing filter chain. Allowing access to
     * static content of the application. Resource paths are defined using ant pattern
     * syntax.
     *
     * @param web - object which creates 'springSecurityFilterChain' instance
     */
    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring()
                .antMatchers("/*.html")
                .antMatchers("/*.js")
                .antMatchers("/assets/**");
    }

    /**
     * Overriding was made to customize how requests are secured.
     * Also cacheControl() method was invoked to easily inject default security
     * headers which assist in protecting the application.
     * Cross-Site Request Forgery is disabled because token-based approach is used for
     * authentication
     *
     * @param http - object which is configured in order to change default
     *             implementation of request handling. Default implementation
     *             requires all http requests to be authorized which isn't suitable
     *             for our application.
     */
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.headers().cacheControl();
        http.csrf().disable()
                .authorizeRequests()
                .antMatchers(HttpMethod.GET, "/api/home", "/api/dashboard", "/api/students/", "api/form").permitAll()
                .antMatchers(HttpMethod.POST, "/api/auth").permitAll()
                .antMatchers(HttpMethod.POST, "/api/student").hasAuthority("ROLE_ADMIN")
                .antMatchers("/api/**").hasAuthority("ROLE_ADMIN")
                .anyRequest().authenticated()
                .and()
                .addFilterBefore(new LoginFilter("/api/auth", authenticationManager()), UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(new AuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
    }

    /**
     * Overriding was made to customize how authentication process will take place.
     * Authentication details are provided my {@link UserDetailsService}
     *
     * @param auth - builder object which allows us to customize {@link AuthenticationManager}
     *             which later on will provide information used in authentication process of an
     *             {@link Authentication} object
     */
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService);
    }
}
