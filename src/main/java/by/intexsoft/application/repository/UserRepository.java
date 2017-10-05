package by.intexsoft.application.repository;

import by.intexsoft.application.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

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


    /**
     * Returns a {@link Page} of entities meeting the paging restriction provided in the {@code Pageable} object.
     *
     * @param pageable - sublist of list of objects to retrieve
     * @return a page of entities
     */
    Page<User> findByEnabled(Pageable pageable, boolean enabled);
}
