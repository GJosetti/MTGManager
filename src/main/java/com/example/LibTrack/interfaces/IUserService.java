package com.example.LibTrack.interfaces;

import com.example.LibTrack.DTOs.CreateUserDTO;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface IUserService  {

    public ResponseEntity createUser(CreateUserDTO createUserDto);
}
