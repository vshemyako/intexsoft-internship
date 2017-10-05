package by.intexsoft.application.service;

import org.springframework.security.core.Authentication;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Service which provides number of methods for JSON Web Token
 * based authentication and verification
 */
public interface AuthenticationService {

    /**
     * Generates JSON Web Token which later on is attached to a response object
     *
     * @param response       - {@link HttpServletResponse} instance which is returned with
     *                       embedded JSON Web Token
     * @param authentication - represents a principal of an authenticated request
     */
    void provideTokenAuthentication(HttpServletResponse response, Authentication authentication);

    /**
     * Verifies provided JSON Web Token embedded in request header
     *
     * @param request - {@link HttpServletRequest} instance which encapsulates JSON
     *                Web Token which will undergo verification
     */
    Authentication verifyTokenAuthentication(HttpServletRequest request);
}
