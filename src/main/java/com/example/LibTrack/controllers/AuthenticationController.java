package com.example.LibTrack.controllers;

import com.example.LibTrack.DTOs.User.AuthenticationDTO;
import com.example.LibTrack.DTOs.User.CreateUserDTO;
import com.example.LibTrack.entities.User;
import com.example.LibTrack.infra.security.TokenService;
import com.example.LibTrack.services.UserService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

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
    public ResponseEntity<?> login(@RequestBody @Validated AuthenticationDTO data) {

        var tokenAuth =
                new UsernamePasswordAuthenticationToken(data.user(), data.password());

        var auth = authenticationManager.authenticate(tokenAuth);

        User user = (User) auth.getPrincipal();

        String token = tokenService.generateToken(user);

        ResponseCookie cookie = tokenService.SetCookie(token);

        Map<String, Object> response = new HashMap<>();
        response.put("role", user.getRoleId());
        response.put("email", user.getEmail());

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(response);
    }

    @PostMapping("/register")
    public ResponseEntity createUser(@RequestBody @Validated CreateUserDTO createUserDTO)
    {
        return userService.createUser(createUserDTO);


    }

    @GetMapping("/me")
    public ResponseEntity<?> me(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).build();
        }

        User user = (User) authentication.getPrincipal();

        Map<String, Object> response = new HashMap<>();
        response.put("email", user.getEmail());
        response.put("id", user.getId());
        response.put("name", user.getName());
        response.put("role", user.getRoleId());

        return ResponseEntity.ok(response);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        ResponseCookie cookie = ResponseCookie.from("access_token", "")
                .path("/")
                .httpOnly(true)
                .secure(false) 
                .maxAge(0)
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(Map.of("message", "Logout realizado com sucesso"));
    }


}
