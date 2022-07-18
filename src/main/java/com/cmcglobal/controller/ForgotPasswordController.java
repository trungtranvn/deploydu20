package com.cmcglobal.controller;

import com.cmcglobal.model.User;
import com.cmcglobal.service.ForgotPasswordService;
import com.cmcglobal.util.AccountException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/auth/users")
@RestController
public class ForgotPasswordController {

    @Autowired
    ForgotPasswordService forgotPasswordService;

    @CrossOrigin
    @PostMapping
    public ResponseEntity<String> checkInfo(@RequestBody User user) {
        String message = "";
        try {
            message = forgotPasswordService.changePassword(user.getUsername(), user.getEmail());
        } catch (AccountException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
        return ResponseEntity.ok(message);
    }
}
