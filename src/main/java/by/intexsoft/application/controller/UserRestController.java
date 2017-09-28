package by.intexsoft.application.controller;

import by.intexsoft.application.model.User;
import by.intexsoft.application.service.UserService;
import ch.qos.logback.classic.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    @RequestMapping(value = "/users/all", method = RequestMethod.GET, produces = "application/json")
    public ResponseEntity<List<User>> findAll() {
        LOGGER.info("Request was received to retrieve all users");
        return new ResponseEntity<>(userService.findAll(), HttpStatus.OK);
    }

    /**
     * Only admin is allowed to use this controller's method to change any kind of users' information
     * @param currentUser - spring-generated entity based on a json in a request body
     * @return newly created instance of a {@link User}
     */
    @RequestMapping(value = "/user/admin", method = RequestMethod.POST, consumes = "application/json")
    public ResponseEntity<User> adminSave(@RequestBody User currentUser) {
        LOGGER.info("Admin request was received to save a new user");
        User obtainedUser = userService.obtainUser(currentUser.username);
        currentUser.setPassword(obtainedUser.password);
        User savedUser = userService.save(currentUser);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    /**
     * @param currentUser - spring-generated entity based on a json in a request body
     * @return newly created instance of a {@link User}
     */
    @RequestMapping(value = "/user", method = RequestMethod.POST, consumes = "application/json")
    public ResponseEntity<User> save(@RequestBody User currentUser) {
        LOGGER.info("Request was received to save a new user");
        User obtainedUser = userService.obtainUser(currentUser.username);
        if (checkForPasswordEquality(obtainedUser, currentUser)) {
            LOGGER.info("Addition password comparison succeeded");
            obtainedUser = userService.save(currentUser);
            return new ResponseEntity<>(obtainedUser, HttpStatus.OK);
        } else {
            LOGGER.warn("Provided credentials were incorrect");
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * @param currentUser - instance of {@link User} retrieved from the request body
     * @return instance of a {@link User} if provided credentials where correct
     */
    @RequestMapping(value = "/user/current", method = RequestMethod.POST, consumes = "application/json")
    public ResponseEntity<User> obtainUser(@RequestBody User currentUser) {
        LOGGER.info("Request was received to obtain user's personal information");
        User obtainedUser = userService.obtainUser(currentUser.username);
        if (checkForPasswordEquality(obtainedUser, currentUser)) {
            LOGGER.info("Personal information was obtained");
            return new ResponseEntity<>(obtainedUser, HttpStatus.OK);
        } else {
            LOGGER.warn("Provided credentials were incorrect");
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
    private boolean checkForPasswordEquality(User obtainedUser, User currentUser) {
        return obtainedUser.password.equals(currentUser.password);
    }

    /**
     * @param id - unique identifier of an entity
     * @return a reference to the entity with the given identifier
     */
    @RequestMapping(value = "/user/{id}", method = RequestMethod.GET, produces = "application/json")
    public ResponseEntity<User> findOne(@PathVariable("id") int id) {
        User currentUser = userService.findOne(id);
        LOGGER.info("Request was received to find a single user {}", id);
        return new ResponseEntity<>(currentUser, HttpStatus.OK);
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
            LOGGER.warn("Request to created a new user failed");
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * @param pageable - instance of {@link Pageable} interface which is has pagination methods
     * @return {@link ResponseEntity<Page<User>>} - response entity with embedded sublist of instances
     * and http status code
     */
    @RequestMapping(value = "/users", method = RequestMethod.GET)
    public ResponseEntity<Page<User>> findSubset(Pageable pageable) {
        LOGGER.info("Request was received to retrieve users starting from page {} with size {}",
                pageable.getPageNumber(), pageable.getPageSize());
        Page<User> userPage = userService.findAll(pageable);

        if (userPage != null) {
            LOGGER.info("Request to retrieve users starting from page {} with size {} succeed",
                    pageable.getPageNumber(), pageable.getPageSize());
            return new ResponseEntity<>(userPage, HttpStatus.CREATED);
        } else {
            LOGGER.warn("Request to retrieve users starting from page {} with size {} failed",
                    pageable.getPageNumber(), pageable.getPageSize());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * @param pageable - instance of {@link Pageable} interface which is has pagination methods
     * @param enabled  - determines whether to retrieve enabled or disabled users
     * @return {@link ResponseEntity<Page<User>>} - response entity with embedded sublist of instances
     * and http status code
     */
    @RequestMapping(value = "/users/{enabled}", method = RequestMethod.GET, produces = "application/json")
    public ResponseEntity<Page<User>> findAll(@PathVariable("enabled") boolean enabled, Pageable pageable) {
        LOGGER.info("Request was received to retrieve users starting from page {} with size {}",
                pageable.getPageNumber(), pageable.getPageSize());
        Page<User> enabledUserPage = userService.findByEnabled(pageable, enabled);

        if (enabledUserPage != null) {
            LOGGER.info("Request to retrieve enabled users starting from page {} with size {} succeed",
                    pageable.getPageNumber(), pageable.getPageSize());
            return new ResponseEntity<>(enabledUserPage, HttpStatus.CREATED);
        } else {
            LOGGER.warn("Request to retrieve enabled users starting from page {} with size {} failed",
                    pageable.getPageNumber(), pageable.getPageSize());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * @param id - unique identifier of an entity
     * @return a reference to the entity with the given identifier
     */
    @RequestMapping(value = "/user/{id}", method = RequestMethod.DELETE, produces = "application/json")
    public ResponseEntity<?> delete(@PathVariable("id") int id) {
        LOGGER.info("Request was received to delete a single user {}", id);
        try {
            userService.delete(id);
            LOGGER.info("Success user {} has been deleted", id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (IllegalArgumentException ex) {
            LOGGER.warn("Error occurred while deleting a user {}", id);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
