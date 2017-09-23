package by.intexsoft.application.service.implementations;

import by.intexsoft.application.model.Authority;
import by.intexsoft.application.model.User;
import by.intexsoft.application.repository.UserRepository;
import by.intexsoft.application.service.AuthorityService;
import by.intexsoft.application.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Service which provides basic functionality for CRUD operations upon {@link User}
 * instances
 */
@Service
public class UserServiceImpl extends AbstractEntityServiceImpl<User> implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthorityService authorityService;

    @Override
    public User findByUserName(String userName) {
        return userRepository.findByUsername(userName);
    }

    @Override
    public User register(User user) {
        List<Authority> authorities = new ArrayList<>();
        authorities.add(authorityService.findByAuthority("ROLE_USER"));
        user.authorities = authorities;
        return userRepository.save(user);
    }
}
