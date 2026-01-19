package com.example.LibTrack.interfaces;

import com.example.LibTrack.DTOs.User.CreateUserDTO;
import org.springframework.http.ResponseEntity;

public interface IUserService  {

    public ResponseEntity createUser(CreateUserDTO createUserDto);
}
