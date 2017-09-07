package by.intexsoft.application.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import by.intexsoft.application.model.Teacher;

/**
 * Interface for generic CRUD operations on a repository of a {@link Teacher}
 * type
 */
@Repository
public interface TeacherRepository extends JpaRepository<Teacher, Integer> {
}
