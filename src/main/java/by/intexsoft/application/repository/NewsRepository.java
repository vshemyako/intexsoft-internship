package by.intexsoft.application.repository;

import by.intexsoft.application.model.News;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Interface for generic CRUD operations on a repository of a {@link News}
 * type
 */
@Repository
public interface NewsRepository extends JpaRepository<News, Integer> {
}
