package by.intexsoft.application.service;

import by.intexsoft.application.model.User;

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
     * @param {@link User} which has to be saved in a database
     * @return - saved {@link User}
     */
    @Transactional
    User register(User user);
}
