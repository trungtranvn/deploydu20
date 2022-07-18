package com.cmcglobal.service;

import com.cmcglobal.model.User;
import com.cmcglobal.model.UserSpecification;
import com.cmcglobal.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class SearchUserServiceImpl implements SearchUserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserSpecification specification;

    @Override
    public Page<User> findUsersPaginated(String request, Pageable pageable, String[] filters) {

        return userRepository.findAll(specification.getFilter(request, filters), pageable);
    }

    @Override
    public Page<User> getAllUsers(Pageable pageable) {

        return userRepository.findAll(pageable);
    }
}
