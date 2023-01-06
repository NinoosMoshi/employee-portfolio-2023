package com.ninos.mail;

import lombok.AllArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.scheduling.annotation.Async;



@AllArgsConstructor
@Service
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender javaMailSender;


    @Async
    @Override
    public void sendCodeByMail(Email email) {

        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setFrom("ninoosmoshi222@gmail.com");
        simpleMailMessage.setTo(email.getTo());
        simpleMailMessage.setSubject("UserCode Active");

        simpleMailMessage.setText("ACTIVE CODE IS: "+ email.getCode());

        javaMailSender.send(simpleMailMessage);


    }
}
