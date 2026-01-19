package com.example.LibTrack.controllers;

import com.example.LibTrack.entities.Autor;
import com.example.LibTrack.services.AuthorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/author")
public class AuthorController {


    AuthorService service;

    public AuthorController(AuthorService service)
    {
        this.service = service;
    }

    @PostMapping("/create")
    public ResponseEntity create(@RequestBody Autor data)
    {
        return service.create(data);
    }

    @PostMapping("/update")
    public ResponseEntity update(@RequestBody Autor data)
    {
        return service.update(data);
    }

    @PostMapping("/delete")
    public ResponseEntity delete(@RequestBody Long id)
    {
        return service.delete(id);
    }

    @GetMapping("/list")
    public ResponseEntity ListAll()
    {
        return ResponseEntity.ok(service.listAll());
    }



}
