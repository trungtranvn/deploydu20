package com.cmcglobal.service;

import com.cmcglobal.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface SearchUserService {

    Page<User> findUsersPaginated(String request, Pageable pageable, String[] filters);

    Page<User> getAllUsers(Pageable pageable);
}
