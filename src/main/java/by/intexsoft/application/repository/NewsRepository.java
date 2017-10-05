package by.intexsoft.application.repository;

import by.intexsoft.application.model.News;
import by.intexsoft.application.model.Status;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;

/**
 * Interface for generic CRUD operations on a repository of a {@link News}
 * type
 */
@Repository
public interface NewsRepository extends JpaRepository<News, Integer> {

    /**
     * Returns a {@link Page} of entities meeting the paging restriction provided in the {@code Pageable} object.
     *
     * @param pageable - sublist of list of objects to retrieve
     * @param status   - identifier of a status to find
     * @return a page of entities
     */
    Page<News> findByStatus(Pageable pageable, Status status);

    /**
     * Returns a {@link Page} of entities meeting the paging restriction provided in the {@code Pageable} object.
     *
     * @param pageable    - sublist of list of objects to retrieve
     * @param status      - identifier of a status to find
     * @param currentTime - time of request in millis
     * @return a page of entities
     */
    @Query("select n from News n where n.status = ?1 and n.startDisplay < ?2 and n.endDisplay > ?2")
    Page<News> findByStatusAndCurrentTime(Pageable pageable, Status status, Date currentTime);
}
