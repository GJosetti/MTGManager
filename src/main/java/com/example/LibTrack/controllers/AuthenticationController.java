package com.example.LibTrack.controllers;

import com.example.LibTrack.DTOs.AuthenticationDTO;
import com.example.LibTrack.DTOs.CreateUserDTO;
import com.example.LibTrack.DTOs.LoginResponseDTO;
import com.example.LibTrack.entities.User;
import com.example.LibTrack.infra.security.TokenService;
import com.example.LibTrack.services.UserService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {


    private final AuthenticationManager authenticationManager;

    private final UserService userService;

    private final TokenService tokenService;

    public AuthenticationController(AuthenticationManager authenticationManager, UserService userService, TokenService tokenService) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
        this.tokenService = tokenService;
    }


    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Validated AuthenticationDTO data)
    {
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.user(), data.password());
        var auth = this.authenticationManager.authenticate(usernamePassword);

        var token = tokenService.generateToken((User)auth.getPrincipal());

        var cookie = tokenService.SetCookie(token);

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .build();

    }
    @PostMapping("/register")
    public ResponseEntity<CreateUserDTO> createUser(@RequestBody @Validated CreateUserDTO createUserDTO)
    {
        return userService.createUser(createUserDTO);

    }

}
