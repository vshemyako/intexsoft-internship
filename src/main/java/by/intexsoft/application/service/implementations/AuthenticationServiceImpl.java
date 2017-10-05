package by.intexsoft.application.service.implementations;

import by.intexsoft.application.controller.UserRestController;
import by.intexsoft.application.model.User;
import by.intexsoft.application.service.AuthenticationService;
import by.intexsoft.application.service.UserService;
import ch.qos.logback.classic.Logger;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;
import java.util.List;
import java.util.Set;

import static io.jsonwebtoken.SignatureAlgorithm.HS256;

/**
 * Provides authentication methods for JSON Web Token
 * creation and verification
 */
@Service
@PropertySource("classpath:security.properties")
public class AuthenticationServiceImpl implements AuthenticationService {

    private static final SignatureAlgorithm SIGNATURE_ALGORITHM = HS256;
    private final static Logger LOGGER = (Logger) LoggerFactory.getLogger(UserRestController.class);

    @Value("${jwt.refresh_time}")
    private long REFRESH_TIME;
    @Value("${jwt.secret_word}")
    private String SECRET_WORD;
    @Value("${jwt.prefix}")
    private String JWT_PREFIX;
    @Value("${jwt.auth_header}")
    private String AUTH_HEADER;
    @Value("${jwt.content_type}")
    private String CONTENT_TYPE;

    private final UserService userService;

    @Autowired
    public AuthenticationServiceImpl(UserService userService) {
        this.userService = userService;
    }

    /**
     * Attaches generated JSON Web Token to a {@link HttpServletResponse} object after successful
     * authentication step
     *
     * @param response       - {@link HttpServletResponse} instance which is returned with
     *                       embedded JSON Web Token
     * @param authentication - represents a principal of an authenticated request
     */
    @Override
    public void provideTokenAuthentication(HttpServletResponse response, Authentication authentication) {
        String username = authentication.getName();
        Claims claims = Jwts.claims().setSubject(username);

        Set<String> authorities = AuthorityUtils.authorityListToSet(authentication.getAuthorities());
        claims.put("scopes", authorities);

        String JWT = generateJWT(claims);
        response.addHeader(AUTH_HEADER, JWT_PREFIX + " " + JWT);
        response.setContentType(CONTENT_TYPE);

        attachJsonToResponseBody(response, convertObjectToJson(authorities));
    }

    /**
     * In order to reduce server requests  - authorities of an authenticated user
     * are converted to JSON format, which later on are attached to response body
     *
     * @param authorities - of a given {@link User}
     * @return object converted to JSON String
     */
    private String convertObjectToJson(Set<String> authorities) {
        String jsonString = null;
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            jsonString = objectMapper.writeValueAsString(authorities);
        } catch (JsonProcessingException exception) {
            LOGGER.error("Error occurred while processing JSON!");
        }
        return jsonString;
    }

    /**
     * Verifies whether {@link HttpServletRequest} object has a encapsulated JSON Web Token
     *
     * @param request - {@link HttpServletRequest} instance which encapsulates JSON
     * @return verified {@link Authentication} object
     */
    @Override
    public Authentication verifyTokenAuthentication(HttpServletRequest request) {
        Authentication authentication = null;
        String token = request.getHeader(AUTH_HEADER);

        if (token != null) {
            try {
                authentication = new UsernamePasswordAuthenticationToken(getUsernameFromJWT(token), null,
                        AuthorityUtils.commaSeparatedStringToAuthorityList(String.join(",", getAuthoritiesFromJWT(token))));
            } catch (NullPointerException exc) {
                LOGGER.error("A JSON Web Token verification error occurred.");
            }
        }
        return authentication;
    }

    /**
     * JSON Web Token generation method, which sequentially adds claims (in another
     * words - the ROLES of the User and expiration date) and a signature, which,
     * following to specification consists of encoded AUTH_HEADER, encoded payload
     * and a SECRET_WORD
     *
     * @param claims - statements about an entity. In our case they represent the ROLES
     *               of the USER
     * @return generated JSON Web Token
     */
    private String generateJWT(Claims claims) {
        return Jwts.builder()
                .setClaims(claims)
                .setExpiration(generateExpirationDate())
                .signWith(SIGNATURE_ALGORITHM, SECRET_WORD)
                .compact();
    }

    /**
     * @param token - JSON Web Token which should be processed upon
     *              authorities existence
     * @return a list of authorities (i.e. the ROLES of the USER)
     */
    private List getAuthoritiesFromJWT(String token) {
        return Jwts.parser().setSigningKey(SECRET_WORD)
                .parseClaimsJws(token.replace(JWT_PREFIX, ""))
                .getBody().get("scopes", List.class);
    }

    /**
     * @param token - JSON Web Token which should be processed upon
     *              subject existence. In our JSON Web Token implementation
     *              this stands for name of the USER
     * @return - name of the USER
     */
    private String getUsernameFromJWT(String token) {
        return Jwts.parser().setSigningKey(SECRET_WORD)
                .parseClaimsJws(token.replace(JWT_PREFIX, ""))
                .getBody().getSubject();
    }

    /**
     * Calculates an amount of time after which JSON Web Token should be refreshed
     *
     * @return generated expiration date, after which, JSON Web Token has to be
     * refreshed
     */
    private Date generateExpirationDate() {
        return new Date(System.currentTimeMillis() + REFRESH_TIME);
    }

    /**
     * @param response     - {@link HttpServletResponse} instance which is user to attach authority
     *                     information to be later used by front-end part of the application
     * @param infoToAttach - authority information (actually appropriate {@link User} roles.
     *                     Expected to be in JSON format
     */
    private void attachJsonToResponseBody(HttpServletResponse response, String infoToAttach) {
        try {
            PrintWriter writer = response.getWriter();
            writer.print(infoToAttach);
            writer.flush();
        } catch (IOException exception) {
            LOGGER.error("An error occurred while writing authority information into response object");
        }
    }
}
