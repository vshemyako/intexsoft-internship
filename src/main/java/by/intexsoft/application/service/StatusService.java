package by.intexsoft.application.service;

import by.intexsoft.application.model.Status;

/**
 * Service that allows performing basic CRUD operations upon {@link Status}
 * entities
 */
public interface StatusService {

    /**
     * Finds {@link Status} instance in the underlying database
     *
     * @param name property of {@link Status} instance
     * @return a {@link Status} instance which was found
     */
    Status findByName(String name);
}
