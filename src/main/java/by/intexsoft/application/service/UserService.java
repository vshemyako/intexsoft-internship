package by.intexsoft.application.service;

import by.intexsoft.application.model.User;

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
}
