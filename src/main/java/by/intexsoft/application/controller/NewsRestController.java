package by.intexsoft.application.controller;

import by.intexsoft.application.model.News;
import by.intexsoft.application.service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * A controller class which maps received requests to an appropriate handler
 * method to handle the request. Controller's logic is tightly bind with {@link News}
 * instances and corresponding services
 */
@RestController
public class NewsRestController {

    private final NewsService newsService;

    /**
     * @param newsService - an instance of a service which provides CRUD operations upon
     *                    News instances
     */
    @Autowired
    public NewsRestController(NewsService newsService) {
        this.newsService = newsService;
    }

    //TODO: Don't forget to substitute user with somekind of DTO. Otherwise pw is exposed
    /**
     * @param pageable - instance of {@link Pageable} interface which is has pagination methods
     * @return {@link ResponseEntity<Page<News>>} - response entity with embedded sublist of instances
     * and http status code
     */
    @RequestMapping(value = "/all/news", method = RequestMethod.GET)
    public ResponseEntity<Page<News>> findSubset(Pageable pageable) {
        Page<News> newsPage = newsService.findAll(pageable);
        if (newsPage != null) {
            return new ResponseEntity<>(newsPage, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}