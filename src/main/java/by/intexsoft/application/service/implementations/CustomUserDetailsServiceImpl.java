package by.intexsoft.application.service.implementations;

import by.intexsoft.application.model.CustomUserDetails;
import by.intexsoft.application.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * Provides detailed information about requested student which is later on
 * used for authentication purposes
 */
@Service
public class CustomUserDetailsServiceImpl implements UserDetailsService {

    private final UserService userService;

    @Autowired
    public CustomUserDetailsServiceImpl(UserService userService) {
        this.userService = userService;
    }

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        return new CustomUserDetails(userService.findByUserName(userName));
    }
}
