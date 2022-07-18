package com.cmcglobal.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.MessageSource;

import com.cmcglobal.model.User;
import com.cmcglobal.repo.UserRepository;
import com.cmcglobal.util.AccountException;

@SpringBootTest
class ViewUserDetailServiceTest {
    @Mock
    UserRepository userRepository;

    @Mock
    MessageSource messageSource;

    @InjectMocks
    ViewUserDetailService detailService;

    @Test
    void givenBadUsernameWhenGetUserDetailShouldThrowException() {
        Mockito.when(userRepository.findById(1L)).thenReturn(Optional.empty());
        Mockito.when(messageSource.getMessage("common.error.usernameNotExist", null, null, null))
                .thenReturn("Wrong username");
        AccountException ex = assertThrows(AccountException.class,
                () -> detailService.getUserDetail(1L));
        assertEquals("Wrong username", ex.getMessage());
    }

    @Test
    void whenGetUserDetail_thenSuccessfully() throws AccountException {
        User user = new User("nvh", "vietha13320@gmail.com", "123456");
        user.setId(1L);
        Mockito.when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        assertEquals(user, detailService.getUserDetail(1L));
    }
}