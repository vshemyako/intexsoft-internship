package by.intexsoft.application.service.implementations;

import org.springframework.stereotype.Service;

import by.intexsoft.application.model.Subject;
import by.intexsoft.application.service.SubjectService;

/**
 * Service which provides basic functionality for CRUD operations upon Subject
 * instances
 */
@Service
public class SubjectServiceImpl extends AbstractEntityServiceImpl<Subject> implements SubjectService {
}
