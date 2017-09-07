package by.intexsoft.application.repository;

import by.intexsoft.application.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Interface for generic CRUD operations on a repository of a {@link User}
 * type
 */
@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    /**
     * Finds {@link User} instance in the underlying database
     *
     * @param username property of {@link User} instance
     * @return a {@link User} instance which was found
     */
    User findByUsername(String username);
}
