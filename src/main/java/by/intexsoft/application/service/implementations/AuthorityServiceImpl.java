package by.intexsoft.application.service.implementations;

import by.intexsoft.application.model.Authority;
import by.intexsoft.application.repository.AuthorityRepository;
import by.intexsoft.application.service.AuthorityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

/**
 * Service which provides basic functionality for CRUD operations upon {@link Authority}
 * instances
 */
@Service
public class AuthorityServiceImpl extends AbstractEntityServiceImpl<Authority> implements AuthorityService {

    private final AuthorityRepository authorityRepository;

    @Autowired
    public AuthorityServiceImpl(JpaRepository<Authority, Integer> jpaRepository, AuthorityRepository authorityRepository) {
        super(jpaRepository);
        this.authorityRepository = authorityRepository;
    }

    @Override
    public Authority findByAuthority(String authority) {
        return authorityRepository.findByAuthority(authority);
    }
}
