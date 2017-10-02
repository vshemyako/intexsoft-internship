package by.intexsoft.application.repository;

import by.intexsoft.application.model.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Interface for generic CRUD operations on a repository of a {@link Status}
 * type
 */
@Repository
public interface StatusRepository extends JpaRepository<Status, Integer> {

    /**
     * Finds {@link Status} instance in the underlying database
     *
     * @param name property of {@link Status} instance
     * @return a {@link Status} instance which was found
     */
    Status findByName(String name);
}
