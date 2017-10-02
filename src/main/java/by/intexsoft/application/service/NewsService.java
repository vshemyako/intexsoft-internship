package by.intexsoft.application.service;

import by.intexsoft.application.model.News;
import by.intexsoft.application.model.Status;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service that allows performing basic CRUD operations upon {@link News}
 * entities
 */
public interface NewsService extends AbstractEntityService<News> {

    /**
     * Returns a {@link Page} of entities meeting the paging restriction provided in the {@code Pageable} object.
     *
     * @param pageable   - sublist of list of objects to retrieve
     * @param statusName - name of {@link Status}
     * @return a page of entities
     */
    Page<News> findByStatusName(Pageable pageable, String statusName);
}
