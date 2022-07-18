package com.cmcglobal.service;

import java.util.Calendar;
import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.cmcglobal.model.User;
import com.cmcglobal.repo.UserRepository;

@Service
public class SignUpService {

    @Autowired
    UserRepository userRepository;
    @Autowired
    PasswordEncoder encoder;
    @Autowired
    MailSignUpService mailSignUpService;
    @Autowired
    MessageSource messageSource;

    public ResponseEntity<String> signUpUser(User user) {

        user.setUsername(user.getUsername().trim());
        user.setEmail(user.getEmail().trim());
        user.setAddress(user.getAddress().trim());
        user.setPassword(user.getPassword().trim());
        user.setPhone(user.getPhone().trim());

        String image = user.getPhoto();
        String nameImage=new String();
        if(image!=null) {
            String[] result = image.split("\\\\");
             nameImage = result[result.length - 1];
        }
        else {
            nameImage=null;
        }
       
        if (userRepository.existsByUsername(user.getUsername())) {
            return ResponseEntity.badRequest()
                    .body(messageSource.getMessage("common.error.existUsername", null, null, null));
        }
        if (userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity.badRequest()
                    .body(messageSource.getMessage("common.error.existEmail", null, null, null));
        }
        if (userRepository.existsByPhone(user.getPhone())) {
            return ResponseEntity.badRequest()
                    .body(messageSource.getMessage("common.error.existPhone", null, null, null));
        }
        if (user.getUsername() == "") {
            return ResponseEntity.badRequest()
                    .body(messageSource.getMessage("common.error.nullUsername", null, null, null));
        }
        if (user.getPassword() == "") {
            return ResponseEntity.badRequest()
                    .body(messageSource.getMessage("common.error.nullPassword", null, null, null));
        }
        if (user.getEmail() == "") {
            return ResponseEntity.badRequest()
                    .body(messageSource.getMessage("common.error.nullEmail", null, null, null));
        }
        if (user.getPhone() == "") {
            return ResponseEntity.badRequest()
                    .body(messageSource.getMessage("common.error.nullPhone", null, null, null));
        }
        if (user.getAddress() == "") {
            return ResponseEntity.badRequest()
                    .body(messageSource.getMessage("common.error.nullAddress", null, null, null));
        }

        Calendar cal = Calendar.getInstance();
        Date date = (Date) cal.getTime();
        User userAdd = new User();
        userAdd.setUsername(user.getUsername());
        userAdd.setEmail(user.getEmail());
        userAdd.setAddress(user.getAddress());
        userAdd.setPassword(encoder.encode(user.getPassword()));
        userAdd.setPhone(user.getPhone());
        userAdd.setStatus(1);
        userAdd.setIs_confirmed(0);
        userAdd.setCreated_date(date);
        userAdd.setPhoto(nameImage);
   
        userRepository.save(userAdd);
        mailSignUpService.sendMail(userAdd);
        return ResponseEntity.ok(messageSource.getMessage("common.message.successSignUp", null, null, null));
    }
    public void updateIsConfirm(String username) {
        Optional<User> userOptional = userRepository.findByUsername(username);
        User user = userOptional.get();
        user.setIs_confirmed(1);
        userRepository.save(user);
    }

}
