package com.example.LibTrack.controllers;

import com.example.LibTrack.DTOs.AuthenticationDTO;
import com.example.LibTrack.DTOs.CreateUserDTO;
import com.example.LibTrack.entities.User;
import com.example.LibTrack.services.UserService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("auth")
public class AuthenticationController {


    private final AuthenticationManager authenticationManager;

    private final UserService userService;

    public AuthenticationController(AuthenticationManager authenticationManager, UserService userService) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
    }


    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Validated AuthenticationDTO data)
    {
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.user(), data.password());
        var auth = this.authenticationManager.authenticate(usernamePassword);

        return ResponseEntity.ok().build();
    }
    @PostMapping("/register")
    public ResponseEntity<CreateUserDTO> createUser(@RequestBody @Validated CreateUserDTO createUserDTO)
    {
        return userService.createUser(createUserDTO);

    }

}
