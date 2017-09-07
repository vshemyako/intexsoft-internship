package by.intexsoft.application.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import by.intexsoft.application.model.Subject;

/**
 * Interface for generic CRUD operations on a repository of a {@link Subject}
 * type
 */
@Repository
public interface SubjectRepository extends JpaRepository<Subject, Integer> {
}
