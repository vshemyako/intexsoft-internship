package by.intexsoft.application.service.implementations;

import by.intexsoft.application.model.Authority;
import by.intexsoft.application.repository.AuthorityRepository;
import by.intexsoft.application.service.AuthorityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Service which provides basic functionality for CRUD operations upon {@link Authority}
 * instances
 */
@Service
public class AuthorityServiceImpl extends AbstractEntityServiceImpl<Authority> implements AuthorityService {

    @Autowired
    private AuthorityRepository authorityRepository;

    @Override
    public Authority findByAuthority(String authority) {
        return authorityRepository.findByAuthority(authority);
    }
}
