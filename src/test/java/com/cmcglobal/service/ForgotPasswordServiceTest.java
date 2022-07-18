
package com.cmcglobal.service;

import com.cmcglobal.model.User;
import com.cmcglobal.repo.UserRepository;
import com.cmcglobal.util.AccountException;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.Spy;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.MessageSource;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.util.Optional;

@SpringBootTest
class ForgotPasswordServiceTest {
    @Mock
    UserRepository userRepository;

    @Spy
    @InjectMocks
    ForgotPasswordService forgotPasswordService;

    @Mock
    MailService mailService;

    @Mock
    MessageSource messageSource;

    @Mock
    PasswordEncoder encoder;

    @Test
    void givenBadEmailWhenChangePasswordShouldThrowException(){
        Mockito.when(userRepository.findByEmailAndUsername("abc@gmail.com", "nvh")).thenReturn(Optional.empty());
        Mockito.when(messageSource.getMessage("common.error.emailOrUsernameNotExist", null, null, null)).thenReturn("Wrong username /email");
        AccountException ex = assertThrows(AccountException.class, ()-> forgotPasswordService.changePassword("abc@gmail.com", "nvh"));
        assertEquals("Wrong username /email", ex.getMessage());
    }

    @Test
    void givenBadUserNameWhenChangePasswordShouldThrowException(){
        Mockito.when(userRepository.findByEmailAndUsername("vietha13320@gmail.com", "abc")).thenReturn(Optional.empty());
        Mockito.when(messageSource.getMessage("common.error.emailOrUsernameNotExist", null, null, null)).thenReturn("Wrong username /email");
        AccountException ex = assertThrows(AccountException.class, ()-> forgotPasswordService.changePassword("vietha13320@gmail.com", "abc"));
        assertEquals("Wrong username /email", ex.getMessage());
    }
    @Test
    void whenSendFailEmail_thenReturnFailMessage() throws AccountException {
        User user = new User("nvh","vietha13320@gmail.com","123456");
        Mockito.when(userRepository.findByEmailAndUsername("vietha13320@gmail.com", "nvh")).thenReturn(Optional.of(user));
        Mockito.when(forgotPasswordService.generateRandomPassword()).thenReturn("asfgg!#$54");
        Mockito.when(mailService.sendMail(user, "asfgg!#$54")).thenReturn(false);
        Mockito.when(messageSource.getMessage("common.message.fail", null, null, null)).thenReturn("Fail");
        assertEquals("Fail", forgotPasswordService.changePassword("nvh", "vietha13320@gmail.com"));
    }
    @Test
    void whenChangePassword_thenSuccessfully() throws AccountException {
        User user = new User("nvh","vietha13320@gmail.com","123456");
        Mockito.when(userRepository.findByEmailAndUsername("vietha13320@gmail.com", "nvh")).thenReturn(Optional.of(user));
        Mockito.when(forgotPasswordService.generateRandomPassword()).thenReturn("asfgg!#$54");
        Mockito.when(mailService.sendMail(user, "asfgg!#$54")).thenReturn(true);
        Mockito.when(messageSource.getMessage("common.message.success", null, null, null)).thenReturn("Success");
        assertEquals("Success", forgotPasswordService.changePassword("nvh", "vietha13320@gmail.com"));
    }

}