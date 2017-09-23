package by.intexsoft.application.service.implementations;

import by.intexsoft.application.model.News;
import by.intexsoft.application.model.User;
import by.intexsoft.application.repository.NewsRepository;
import by.intexsoft.application.service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Service which provides basic functionality for CRUD operations upon {@link User}
 * instances
 */
@Service
public class NewsServiceImpl extends AbstractEntityServiceImpl<News> implements NewsService {

    @Autowired
    private NewsRepository newsRepository;
}
