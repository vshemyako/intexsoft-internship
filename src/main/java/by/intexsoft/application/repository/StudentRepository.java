package by.intexsoft.application.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import by.intexsoft.application.model.Student;

/**
 * Interface for generic CRUD operations on a repository of a
 * {@link Student} type
 */
@Repository
public interface StudentRepository extends JpaRepository<Student, Integer> {
}