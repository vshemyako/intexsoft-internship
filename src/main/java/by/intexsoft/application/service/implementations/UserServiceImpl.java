package by.intexsoft.application.service.implementations;

import by.intexsoft.application.model.User;
import by.intexsoft.application.repository.UserRepository;
import by.intexsoft.application.service.UserService;
import by.intexsoft.application.service.implementations.AbstractEntityServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Service which provides basic functionality for CRUD operations upon {@link User}
 * instances
 */
@Service
public class UserServiceImpl extends AbstractEntityServiceImpl<User> implements UserService {

    @Autowired
    UserRepository userRepository;

    @Override
    public User findByUserName(String userName) {
        return userRepository.findByUsername(userName);
    }
}
