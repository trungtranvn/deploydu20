package com.cmcglobal.controller;

import java.io.IOException;

import javax.mail.MessagingException;
import javax.mail.internet.AddressException;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

import com.cmcglobal.model.User;
import com.cmcglobal.repo.UserRepository;
import com.cmcglobal.service.SignUpService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class SignUpController {
    public static String upload = System.getProperty("user.dir");
    @Autowired
    ServletContext application;
    @Autowired
    private SignUpService signUpService;
    @Autowired
    PasswordEncoder encoder;
    @Autowired
    UserRepository userRepository;
    @Autowired
    MessageSource messageSource;

    @PostMapping(value = "/dangki")
    public ResponseEntity<String> registerUser(@RequestBody User signUpRequest, HttpServletRequest request)
            throws AddressException, MessagingException, IOException {

        return signUpService.signUpUser(signUpRequest);

    }

    @GetMapping(value = "/confirmemail")
    public RedirectView sendEmail(HttpServletRequest request, @RequestParam("username") String username, Model model,
            HttpServletResponse response) throws AddressException, MessagingException, IOException {

        signUpService.updateIsConfirm(username);
        return new RedirectView(messageSource.getMessage("common.link.frontend", null, null, null) + "/login");
    }

}
