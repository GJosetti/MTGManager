package com.example.LibTrack.controllers;

import com.example.LibTrack.DTOs.Email.EmailDTO;
import com.example.LibTrack.services.EmailService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
public class EmailController {

    EmailService service;

    public EmailController(EmailService service)
    {
        this.service = service;
    }


    @PostMapping("/send")
    public ResponseEntity sendEmail(@RequestBody EmailDTO emailDTO)
    {
        return service.sendEmail(emailDTO);

    }

}
