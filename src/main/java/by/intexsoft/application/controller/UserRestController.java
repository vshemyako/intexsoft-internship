package by.intexsoft.application.controller;

import by.intexsoft.application.model.CustomUserDetails;
import by.intexsoft.application.model.User;
import by.intexsoft.application.service.UserService;
import ch.qos.logback.classic.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;

/**
 * A controller class which maps received requests to an appropriate handler
 * method to handle the request
 */
@RestController
public class UserRestController {

    private final static Logger LOGGER = (Logger) LoggerFactory.getLogger(UserRestController.class);

    private final UserService userService;

    /**
     * @param userService - an instance of a service which provides CRUD operations upon
     *                    User instances
     */
    @Autowired
    public UserRestController(UserService userService) {
        this.userService = userService;
    }

    /**
     * @return a list of users retrieved from a corresponding service
     */
    @RequestMapping(value = "/users", method = RequestMethod.GET, produces = "application/json")
    public List<User> findAll() {
        LOGGER.info("Request was received to retrieve all users");
        return userService.findAll();
    }

    /**
     * @param user - spring-generated entity based on a json in a request body
     * @return newly created instance of a {@link User}
     */
    @RequestMapping(value = "/user", method = RequestMethod.POST, consumes = "application/json")
    public User save(@RequestBody User user) {
        LOGGER.info("Request was received to save new user");
        return userService.save(user);
    }

    /**
     * @param currentUser - instance of {@link User} retrieved from the request body
     * @return instance of a {@link User} if provided credentials where correct
     */
    @RequestMapping(value = "/user/current", method = RequestMethod.POST, consumes = "application/json")
    public ResponseEntity<User> obtainUser(@RequestBody User currentUser) {
        LOGGER.info("Request was received to obtain user's personal information");
        User obtainedUser = userService.obtainUser(currentUser.username);
        if (checkForUsernameEquality(obtainedUser, currentUser)) {
            LOGGER.info("Personal information was obtained");
            return new ResponseEntity<>(obtainedUser, HttpStatus.OK);
        } else {
            LOGGER.info("Provided credentials were incorrect");
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Helper method which checks whether provided username password is the same obtained from the database
     *
     * @param obtainedUser - {@link User} instance obtain from the database
     * @param currentUser  - {@link User} instance retrieved from the request body
     * @return - true if both password are the same, otherwise - false
     */
    private boolean checkForUsernameEquality(User obtainedUser, User currentUser) {
        return obtainedUser.password.equals(currentUser.password);
    }

    /**
     * @param id - unique identifier of an entity
     * @return a reference to the entity with the given identifier
     */
    @RequestMapping(value = "/user/{id}", method = RequestMethod.GET, produces = "application/json")
    public User findOne(@PathVariable("id") int id) {
        LOGGER.info("Request was received to find a single user {}", id);
        return userService.findOne(id);
    }

    /**
     * @param user - spring-generated entity based on a json in a request body
     * @return {@link ResponseEntity} which in essence is an object with response header/body and HTTP
     * status code
     */
    @RequestMapping(value = "/register", method = RequestMethod.POST, consumes = "application/json")
    public ResponseEntity<User> register(@RequestBody User user) {
        LOGGER.info("Request was received to create new user");
        User createdUser = userService.register(user);
        if (createdUser != null) {
            LOGGER.info("New user was successfully created");
            return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
        } else {
            LOGGER.info("Request to created a new user failed");
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
