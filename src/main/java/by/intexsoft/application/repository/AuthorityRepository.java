package by.intexsoft.application.repository;

import by.intexsoft.application.model.Authority;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Interface for generic CRUD operations on a repository of a {@link Authority}
 * type
 */
@Repository
public interface AuthorityRepository extends JpaRepository<Authority, Integer> {

    /**
     * Finds {@link Authority} instance in the underlying database
     *
     * @param authority property of {@link Authority} instance
     * @return an {@link Authority} instance which was found
     */
    Authority findByAuthority(String authority);
}
