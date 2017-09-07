package by.intexsoft.application.service;

import java.util.List;

import by.intexsoft.application.model.AbstractEntity;
import by.intexsoft.application.model.User;

/**
 * Global interface for general CRUD operations
 *
 * @param <T> - entities of type T which are subclasses of a AbstractEntity
 *            class
 */
public interface AbstractEntityService<T extends AbstractEntity> {

    /**
     * Deletes the entity with the given id
     *
     * @param id - unique identifier of an entity
     */
    void delete(int id);

    /**
     * Saves a given entity. Save operation might change a given instance, for
     * this reason an instance is returned
     *
     * @param entity which has to be saved in a database
     * @return - saved entity
     */
    T save(T entity);

    /**
     * Returns matching instance of an entity
     *
     * @param id - unique identifier of an entity
     * @return - a reference to the entity with the given identifier
     */
    T findOne(int id);

    /**
     * Returns a List of found instances of subtype <{@link AbstractEntity}
     *
     * @return all found instances
     */
    List<T> findAll();
}
