package by.intexsoft.application.controller;

import by.intexsoft.application.model.User;
import by.intexsoft.application.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * A controller class which maps received requests to an appropriate handler
 * method to handle the request
 */
@RestController
public class UserRestController {

	private final UserService userService;

	/**
	 * @param userService
	 *            - an instance of a service which provides CRUD operations upon
	 *            User instances
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
		return userService.findAll();
	}

	/**
	 * @param user - spring-generated entity based on a json in a request body
	 * @return newly created instance of a {@link User}
	 */
	@RequestMapping(value = "/user", method = RequestMethod.POST, consumes = "application/json")
	public User save(@RequestBody User user) {
		return userService.save(user);
	}
	
	/**
	 * @param id - unique identifier of an entity
	 * @return a reference to the entity with the given identifier
	 */
	@RequestMapping(value = "user/{id}", method = RequestMethod.GET, produces = "application/json")
	public User findOne(@PathVariable("id") int id) {
		return userService.findOne(id);
	}
}
