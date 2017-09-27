package by.intexsoft.application.controller;

import by.intexsoft.application.model.News;
import by.intexsoft.application.model.User;
import by.intexsoft.application.service.NewsService;
import ch.qos.logback.classic.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * A controller class which maps received requests to an appropriate handler
 * method to handle the request. Controller's logic is tightly bind with {@link News}
 * instances and corresponding services
 */
@RestController
public class NewsRestController {

    private final static Logger LOGGER = (Logger) LoggerFactory.getLogger(UserRestController.class);

    private final NewsService newsService;

    /**
     * @param newsService - an instance of a service which provides CRUD operations upon
     *                    News instances
     */
    @Autowired
    public NewsRestController(NewsService newsService) {
        this.newsService = newsService;
    }

    /**
     * @param pageable - instance of {@link Pageable} interface which is has pagination methods
     * @return {@link ResponseEntity<Page<News>>} - response entity with embedded sublist of instances
     * and http status code
     */
    //TODO: Don't forget to substitute user with somekind of DTO. Otherwise pw is exposed
    //TODO: Temporary solution - annotated entity with @JsonIgnore @JsonProperty
    @RequestMapping(value = "/news", method = RequestMethod.GET)
    public ResponseEntity<Page<News>> findSubset(Pageable pageable) {
        LOGGER.info("Request was received to retrieve news starting from page {} with size {}",
                pageable.getPageNumber(), pageable.getPageSize());
        Page<News> newsPage = newsService.findAll(pageable);

        if (newsPage != null) {
            LOGGER.info("Request to retrieve news starting from page {} with size {} succeed",
                    pageable.getPageNumber(), pageable.getPageSize());
            return new ResponseEntity<>(newsPage, HttpStatus.CREATED);
        } else {
            LOGGER.info("Request to retrieve news starting from page {} with size {} failed",
                    pageable.getPageNumber(), pageable.getPageSize());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * @param id - unique identifier of an entity to be retrieved
     * @return a reference to the entity with the given identifier
     */
    @RequestMapping(value = "/news/{id}", method = RequestMethod.GET, produces = "application/json")
    public ResponseEntity<News> findOne(@PathVariable("id") int id) {
        LOGGER.info("Request was received to find a single news article {}", id);
        News singleNews = newsService.findOne(id);

        if (singleNews != null) {
            LOGGER.info("Single news article {} retrieval succeed", id);
            return new ResponseEntity<>(singleNews, HttpStatus.CREATED);
        } else {
            LOGGER.info("Single news article {} retrieval failed", id);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * @param news - spring-generated entity based on a json in a request body
     * @return newly created instance of a {@link News}
     */
    @RequestMapping(value = "/news", method = RequestMethod.POST, consumes = "application/json")
    public ResponseEntity<News> save(@RequestBody News news) {
        LOGGER.info("Request was received to save news {}", news.getId());
        News singleNews = newsService.save(news);

        if (singleNews != null) {
            LOGGER.info("Single news article {} has been saved", singleNews.getId());
            return new ResponseEntity<>(singleNews, HttpStatus.CREATED);
        } else {
            LOGGER.info("Single news article {} hasn't been saved", news.getId());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}