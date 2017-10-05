package by.intexsoft.application.service.implementations;

import by.intexsoft.application.model.News;
import by.intexsoft.application.model.Status;
import by.intexsoft.application.model.User;
import by.intexsoft.application.repository.NewsRepository;
import by.intexsoft.application.repository.StatusRepository;
import by.intexsoft.application.service.NewsService;
import by.intexsoft.application.service.StatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.Date;

/**
 * Service which provides basic functionality for CRUD operations upon {@link User}
 * instances
 */
@Service
public class NewsServiceImpl extends AbstractEntityServiceImpl<News> implements NewsService {

    private final NewsRepository newsRepository;
    private final StatusService statusService;

    @Autowired
    public NewsServiceImpl(
            JpaRepository<News, Integer> jpaRepository,
            NewsRepository newsRepository,
            StatusService statusService) {
        super(jpaRepository);
        this.newsRepository = newsRepository;
        this.statusService = statusService;
    }

    @Override
    public News save(News news) {
        if (news.status == null) {
            news.status = statusService.findByName("created");
        }
        return newsRepository.save(news);
    }

    /**
     * Returns a {@link Page} of entities meeting the paging restriction provided in the {@code Pageable} object.
     *
     * @param pageable   - sublist of list of objects to retrieve
     * @param statusName - name of {@link Status}
     * @return a page of entities
     */
    @Override
    public Page<News> findByStatusName(Pageable pageable, String statusName) {
        Status status = statusService.findByName(statusName);
        return newsRepository.findByStatus(pageable, status);
    }

    /**
     * Returns a {@link Page} of entities meeting the paging restriction provided in the {@code Pageable} object.
     *
     * @param pageable - sublist of list of objects to retrieve
     * @return a page of reviewed articles
     */
    @Override
    public Page<News> findAllReviewedAndRelevant(Pageable pageable) {
        Status status = statusService.findByName("approved");
        System.out.println(new Date());
        System.out.println(status.name);
        return newsRepository.findByStatusAndCurrentTime(pageable, status, new Date());
    }
}
