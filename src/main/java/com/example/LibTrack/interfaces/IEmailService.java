package com.example.LibTrack.interfaces;

import com.example.LibTrack.DTOs.Email.EmailDTO;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;

public interface IEmailService {

public ResponseEntity sendEmail(EmailDTO emailDTO);


}
