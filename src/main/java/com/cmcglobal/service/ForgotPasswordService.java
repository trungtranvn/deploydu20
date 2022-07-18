package com.cmcglobal.service;

import com.cmcglobal.model.User;
import com.cmcglobal.repo.UserRepository;
import com.cmcglobal.util.AccountException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Random;

@Service
public class ForgotPasswordService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    MailService mailService;

    @Autowired
    MessageSource messageSource;

    public String changePassword(String username, String email) throws AccountException {
        User user;
        username = username.trim();
        email = email.trim();
        Optional<User> optionalUser = userRepository.findByEmailAndUsername(email, username);
        if (optionalUser.isPresent()){
            user = optionalUser.get();
            String password = generateRandomPassword();
            // Send email
            if (mailService.sendMail(user, password)) {
                userRepository.updatePassword(username, encoder.encode(password));
                return messageSource.getMessage("common.message.success", null, null, null);
            } else
                return messageSource.getMessage("common.message.fail", null, null, null);
        }
        else
            throw new AccountException(
                    messageSource.getMessage("common.error.emailOrUsernameNotExist", null, null, null));
    }

    protected String generateRandomPassword() {
        final String alpha = "abcdefghijklmnopqrstuvwxyz"; // a-z
        final String alphaUpperCase = alpha.toUpperCase(); // A-Z
        final String digits = "0123456789"; // 0-9
        final String specials = "~=+%^*/()[]{}/!@#$?|";
        final String listCharacters = alpha + alphaUpperCase + digits + specials;
        Random random = new Random();
        int length = 20;
        char[] password = new char[length];
        for (int i = 0; i < 20; i++) {
            password[i] = listCharacters.charAt(random.nextInt(listCharacters.length()));
        }
        return password.toString();
    }
}
