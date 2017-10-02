package by.intexsoft.application.service;

import by.intexsoft.application.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import javax.transaction.Transactional;

/**
 * Service that allows performing basic CRUD operations upon {@link User}
 * entities
 */
public interface UserService extends AbstractEntityService<User> {

    /**
     * Attempting to find an entity with the given name
     *
     * @param name of requested entity
     * @return entity instance
     */
    User findByUserName(String name);

    /**
     * Saves a given entity. Save operation might change a given instance, for
     * this reason an instance is returned
     *
     * @param user - {@link User} which has to be saved in a database
     * @return - saved {@link User}
     */
    @Transactional
    User register(User user);

    /**
     * Returns User instance if provided credentials were correct
     *
     * @param username - username of a {@link User} instance to obtain
     * @return instance of a {@link User}
     */
    @Transactional
    User obtainUser(String username);

    /**
     * Returns a {@link Page} of entities meeting the paging restriction provided in the {@code Pageable} object.
     *
     * @param pageable - sublist of list of objects to retrieve
     * @return a page of entities
     */
    Page<User> findByEnabled(Pageable pageable, boolean enabled);
}
