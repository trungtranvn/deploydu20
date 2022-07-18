package com.cmcglobal.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.cmcglobal.repo.AttemptRepository;
import com.cmcglobal.repo.UserRepository;
import com.cmcglobal.service.UserDetailsSecurityService;

@Component
public class AuthProvider /* implements AuthenticationProvider */ {
    private static final int ATTEMPTS_LIMIT = 3;
    @Autowired
    private UserDetailsSecurityService userDetailsService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AttemptRepository attemptsRepository;
    @Autowired
    private UserRepository userRepository;

    // @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String username = authentication.getPrincipal().toString();
        String password = authentication.getCredentials().toString();

        UserDetails userInfo = userDetailsService.loadUserByUsername(username);
        if (userInfo.isAccountNonLocked()) {
            if (passwordEncoder.matches(password, userInfo.getPassword())) {
                return new UsernamePasswordAuthenticationToken(username, password, userInfo.getAuthorities());
            } else {
                // throw new LockedException("Account is incorrect!");
                // processFailedAttempts(username, (User) userInfo);
                throw new BadCredentialsException("Password's wrong!");
            }
        } else {
            throw new LockedException("Account is locked!");
        }
    }

    /*
     * private void processFailedAttempts(String username, User user) {
     * Optional<Attempt> userAttempts =
     * attemptsRepository.findAttemptsByUsername(username); if
     * (userAttempts.isPresent()) { Attempt attempts = new Attempt();
     * attempts.setUserName(username); attempts.setAttempts(1);
     * attemptsRepository.save(attempts); } else { Attempt attempts =
     * userAttempts.get(); attempts.setAttempts(attempts.getAttempts() + 1);
     * attemptsRepository.save(attempts);
     * 
     * if (attempts.getAttempts() + 1 > ATTEMPTS_LIMIT) { user.setLocked(false);
     * userRepository.save(user); throw new
     * LockedException("Too many invalid attempts. Account is locked!!"); } } }
     */

    // @Override
    public boolean supports(Class<?> authentication) {
        return true;
    }

}
