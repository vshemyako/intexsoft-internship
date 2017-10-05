package by.intexsoft.application.service;

import by.intexsoft.application.model.Authority;

import javax.transaction.Transactional;

/**
 * Service that allows performing basic CRUD operations upon {@link Authority}
 * entities
 */
public interface AuthorityService extends AbstractEntityService<Authority>{

    /**
     * Finds {@link Authority} instance in the underlying database
     *
     * @param authority property of {@link Authority} instance
     * @return an {@link Authority} instance which was found
     */
    @Transactional
    Authority findByAuthority(String authority);
}
