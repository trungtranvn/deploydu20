package com.cmcglobal.service;

import com.cmcglobal.model.User;
import com.cmcglobal.model.UserSpecification;
import com.cmcglobal.repo.UserRepository;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
class SearchUserServiceImplTest {

    @Mock
    UserRepository userRepository;

    @Mock
    UserSpecification specification;

    @InjectMocks
    SearchUserServiceImpl searchUserService;

    @Test
    void findUsersPaginatedTest_findByUsername() {
        User user = new User("dat", "dat@gmail.com", "dat");
        Pageable pageable = PageRequest.of(0, 2);
        List<User> expectedList = new ArrayList<>();
        expectedList.add(user);
        String[] filters = { "username" };
        Page<User> page = new PageImpl<>(expectedList);
        Mockito.when(userRepository.findAll(specification.getFilter("dat", filters), pageable)).thenReturn(page);
        assertEquals(1, searchUserService.findUsersPaginated("dat", pageable, filters).getTotalElements());
    }

    @Test
    void findUsersPaginatedTest_findByUsernameAndEmail() {
        User user = new User("dat", "dat@gmail.com", "dat");
        User user2 = new User("dat2", "dat2@gmail.com", "dat");
        User user3 = new User("dat3", "dat3@gmail.com", "dat");
        User user4 = new User("dat4", "dat4@gmail.com", "dat");
        User user5 = new User("da5", "dat5@gmail.com", "dat");
        List<User> userList = new ArrayList<>();
        userList.add(user);
        userList.add(user2);
        userList.add(user3);
        userList.add(user4);
        userList.add(user5);
        Pageable pageable = PageRequest.of(0, 3);
        String[] filters = { "username", "email" };
        Page<User> page = new PageImpl<>(userList);
        Mockito.when(userRepository.findAll(specification.getFilter("dat", filters), pageable)).thenReturn(page);
        assertEquals(userList, searchUserService.findUsersPaginated("dat", pageable, filters).getContent());
    }

    @Test
    void getAllUsers() {
        User user = new User("dat", "dat@gmail.com", "dat");
        User user2 = new User("dat2", "dat2@gmail.com", "dat");
        User user3 = new User("dat3", "dat3@gmail.com", "dat");
        User user4 = new User("dat4", "dat4@gmail.com", "dat");
        User user5 = new User("da5", "dat5@gmail.com", "dat");
        List<User> userList = new ArrayList<>();
        userList.add(user);
        userList.add(user2);
        userList.add(user3);
        userList.add(user4);
        userList.add(user5);
        Pageable pageable = PageRequest.of(0, 10);
        Page<User> userPage = new PageImpl<>(userList, pageable, userList.size());
        Mockito.when(userRepository.findAll(pageable)).thenReturn(userPage);
        assertEquals(5, searchUserService.getAllUsers(pageable).getTotalElements());
    }
}
