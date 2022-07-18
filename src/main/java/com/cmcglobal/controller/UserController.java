package com.cmcglobal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cmcglobal.model.User;
import com.cmcglobal.repo.UserRepository;

@Controller
@RequestMapping("/M_U_01")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping(headers = "Accept=application/x-www-form-urlencoded")
    public @ResponseBody String addUser(User newUser, BindingResult result, Model model) {
        newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
        newUser.setEmail(newUser.getEmail());
        // newUser.setEnabled(true);
        userRepository.save(newUser);
        return "redirect:index";
    }

    @GetMapping
    public String index() {
        return "register";
    }
}
