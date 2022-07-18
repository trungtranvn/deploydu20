package com.cmcglobal.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.cmcglobal.model.Role;
import com.cmcglobal.model.User;
import com.cmcglobal.repo.RoleRepository;
import com.cmcglobal.repo.UserRepository;
import com.cmcglobal.util.AccountException;

@Service
public class ViewUserDetailService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    MessageSource messageSource;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    public User getUserDetail(Long userId) throws AccountException {
        User user;
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent())
            user = optionalUser.get();
        else
            throw new AccountException(messageSource.getMessage("common.error.badRequest", null, null, null));
        return user;
    }

    public User updatedUser(User user) throws AccountException {
        Optional<User> optionalUser = userRepository.findById(user.getId());
        User userResp;
        if (optionalUser.isPresent())
            userResp = optionalUser.get();
        else
            throw new AccountException(messageSource.getMessage("common.error.badRequest", null, null, null));

        if (userRepository.existsByEmail(user.getEmail()) && !user.getEmail().equals(userResp.getEmail())) {
            throw new AccountException(messageSource.getMessage("common.error.existEmail", null, null, null));
        } else if (userRepository.existsByPhone(user.getPhone())
                && !user.getPhone().equals(userResp.getPhone())) {
            throw new AccountException(messageSource.getMessage("common.error.existPhone", null, null, null));
        } else {
            if (!user.getPassword().equals(userResp.getPassword()))
                user.setPassword(encoder.encode(user.getPassword()));
            userResp.setUsername(user.getUsername());
            userResp.setPassword(user.getPassword());
            userResp.setEmail(user.getEmail());
            userResp.setPhone(user.getPhone());
            userResp.setAddress(user.getAddress());
            userResp.setStatus(user.getStatus());
            userResp.setRoles(user.getRoles());
            userResp = userRepository.save(userResp);
        }
        return userResp;
    }

    public List<Role> findAllRoles() {
        return roleRepository.findAll();
    }

    public void deleteUser(Long id) {  
        userRepository.deleteById(id);
    }
    
    public User addedUser(User user) throws AccountException {
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new AccountException(messageSource.getMessage("common.error.existUsername", null, null, null));
        } else if (userRepository.existsByEmail(user.getEmail())) {
            throw new AccountException(messageSource.getMessage("common.error.existEmail", null, null, null));
        } else if (userRepository.existsByPhone(user.getPhone())) {
            throw new AccountException(messageSource.getMessage("common.error.existPhone", null, null, null));
        } else {
            user.setPassword(encoder.encode(user.getPassword()));
            userRepository.save(user);
        }
        return user;
    }
}
