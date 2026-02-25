package com.example.LibTrack.services;

import com.example.LibTrack.DTOs.Email.EmailDTO;
import com.example.LibTrack.interfaces.IEmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService implements IEmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Override
    public ResponseEntity sendEmail(EmailDTO EmailDTO) {

        SimpleMailMessage mail = new SimpleMailMessage();

        mail.setTo(EmailDTO.to());
        mail.setSubject(EmailDTO.subject());
        mail.setText(EmailDTO.message());

        mailSender.send(mail);

        return ResponseEntity.ok().build();
    }
}