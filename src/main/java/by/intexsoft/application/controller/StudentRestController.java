package by.intexsoft.application.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * A controller class which maps received requests to an appropriate handler
 * method to handle the request
 */
@RestController
public class StudentRestController {

	private final StudentServiceImpl studentServiceImpl;

	/**
	 * @param studentServiceImpl
	 *            - an instance of a service which provides CRUD operations upon
	 *            Student instances
	 */
	@Autowired
	public StudentRestController(StudentServiceImpl studentServiceImpl) {
		this.studentServiceImpl = studentServiceImpl;
	}

	/**
	 * @return a list of students retrieved from a corresponding service
	 */
	@RequestMapping(value = "/students", method = RequestMethod.GET, produces = "application/json")
	public List<Student> findAll() {
		return studentServiceImpl.findAll();
	}

	/**
	 * @param student - spring-generated entity based on a json in a request body
	 * @return newly created instance of a {@link Student}
	 */
	@RequestMapping(value = "/student", method = RequestMethod.POST, consumes = "application/json")
	public Student save(@RequestBody Student student) {
		return studentServiceImpl.save(student);
	}
	
	/**
	 * @param id - unique identifier of an entity
	 * @return a reference to the entity with the given identifier
	 */
	@RequestMapping(value = "student/{id}", method = RequestMethod.GET, produces = "application/json")
	public Student findOne(@PathVariable("id") int id) {
		return studentServiceImpl.findOne(id);
	}
}
