package com.cmcglobal.service;

import com.cmcglobal.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailSignUpService {

    @Autowired
    JavaMailSender mailSender;

    @Autowired
    MessageSource messageSource;

    @Value("${mail.username}")
    private String sender;

    public Boolean sendMail(User user) {
        // Create the email
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(user.getEmail());
        mailMessage.setSubject(messageSource.getMessage("email.subject.signup", null, null, null));
        mailMessage.setFrom(sender);
        mailMessage.setText(messageSource.getMessage("email.content.signup", null, null, null) + user.getUsername());

        // Send the email
        try {
            mailSender.send(mailMessage);
        } catch (Exception ex) {
            return false;
        }
        return true;
    }
}
