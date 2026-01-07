package com.example.LibTrack.controllers;

import com.example.LibTrack.DTOs.CreateUserDTO;
import com.example.LibTrack.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
@AllArgsConstructor
public class UserController {

    private UserService userService;

    @PostMapping
    public ResponseEntity<CreateUserDTO> createUser(@RequestBody CreateUserDTO createUserDTO)
    {
        CreateUserDTO savedUser = userService.createUser(createUserDTO);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

}
