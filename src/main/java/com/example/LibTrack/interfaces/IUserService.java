package com.example.LibTrack.interfaces;

import com.example.LibTrack.DTOs.CreateUserDTO;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;

public interface IUserService {

    public ResponseEntity createUser(CreateUserDTO createUserDto);
}
