package by.intexsoft.application.security.filter;

import by.intexsoft.application.service.AuthenticationService;

import by.intexsoft.application.service.implementations.AuthenticationServiceImpl;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

/**
 * Work of this filter is based upon {@link AuthenticationService} which is
 * capable of JSON Web Token generation and verification processes
 */
public class AuthenticationFilter extends GenericFilterBean {

    private AuthenticationService authenticationService = new AuthenticationServiceImpl();

    /**
     * Filters requests which do not have verified JSON Web Token
     *
     * @param request     - {@link ServletRequest} object which potentially holds JSON Web Token
     * @param response    - {@link ServletResponse} object which after successful verification process
     *                    will be attached with JSON Web Token
     * @param filterChain - represents and object which can delegate filtering process to another
     *                    filter in the filtering chain
     */
    @Override
    public void doFilter(ServletRequest request,
                         ServletResponse response,
                         FilterChain filterChain)
            throws IOException, ServletException {

        Authentication authentication = authenticationService
                .verifyTokenAuthentication((HttpServletRequest) request);
        SecurityContextHolder.getContext()
                .setAuthentication(authentication);
        filterChain.doFilter(request, response);
    }
}
