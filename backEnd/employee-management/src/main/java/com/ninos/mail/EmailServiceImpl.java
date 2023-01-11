package com.ninos.mail;

import com.ninos.security.entity.Code;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.scheduling.annotation.Async;


@Service
public class EmailServiceImpl implements EmailService {

    @Autowired
    private JavaMailSender javaMailSender;


    @Async
    @Override
    public void sendCodeByMail(Email email) {

        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setFrom("ninoosmoshi222@gmail.com");
        simpleMailMessage.setTo(email.getTo());
        simpleMailMessage.setSubject("UserCode Active");
        simpleMailMessage.setText(email.getCode());
        javaMailSender.send(simpleMailMessage);

    }
}
