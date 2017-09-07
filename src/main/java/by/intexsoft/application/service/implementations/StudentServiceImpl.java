package by.intexsoft.application.service.implementations;

import org.springframework.stereotype.Service;

import by.intexsoft.application.model.Student;
import by.intexsoft.application.service.StudentService;

/**
 * Service which provides basic functionality for CRUD operations upon Stundent
 * instances
 */
@Service
public class StudentServiceImpl extends AbstractEntityServiceImpl<Student> implements StudentService {
}
