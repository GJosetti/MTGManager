package com.example.LibTrack.controllers;

import com.example.LibTrack.DTOs.CreateUserDTO;
import com.example.LibTrack.DTOs.UpdateUserDTO;
import com.example.LibTrack.entities.User;
import com.example.LibTrack.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private UserService service;

    @GetMapping("/list")
    private List<User> ListarUsuarios()
    {
        return service.ListAllUsers();
    }

    @PostMapping("/update")
    private ResponseEntity Update(@RequestBody @Validated UpdateUserDTO data)
    {
        return service.updateUser(data);
    }

}
