package com.cmcglobal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cmcglobal.model.User;
import com.cmcglobal.service.ViewUserDetailService;
import com.cmcglobal.util.AccountException;

@RequestMapping("/api/users")
@RestController
public class ViewUserDetailController {

    @Autowired
    ViewUserDetailService userDetailService;

    @Autowired
    MessageSource messageSource;

    @CrossOrigin
    @GetMapping("/detail")
    public ResponseEntity<?> getUserDetail(@RequestParam Long userId) {
        User user;
        try {
            user = userDetailService.getUserDetail(userId);
        } catch (AccountException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
        return ResponseEntity.ok(user);
    }

    @CrossOrigin
    @PutMapping("/updated")
    public ResponseEntity<?> updatedUser(@RequestBody User user) {
        try {
            userDetailService.updatedUser(user);
        } catch (AccountException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
        return ResponseEntity.ok(messageSource.getMessage("common.message.editedSuccessfully", null, null, null));
    }

    @CrossOrigin
    @GetMapping("/findAllRoles")
    public ResponseEntity<?> findAllRoles() {
        return ResponseEntity.ok(userDetailService.findAllRoles());
    }
    @CrossOrigin
    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteUser(@RequestBody Long userId){
        try {
            userDetailService.deleteUser(userId);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        return ResponseEntity.ok(messageSource.getMessage("common.message.deleteSuccessfully", null, null, null));
    }
    @CrossOrigin
    @PostMapping("/added")
    public ResponseEntity<?> addedUser(@RequestBody User user) {
        try {
            userDetailService.addedUser(user);
        } catch (AccountException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
        return ResponseEntity.ok(messageSource.getMessage("common.message.addedSuccessfully", null, null, null));
    }
}
