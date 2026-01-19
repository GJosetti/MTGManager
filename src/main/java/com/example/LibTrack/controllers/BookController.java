package com.example.LibTrack.controllers;

import com.example.LibTrack.entities.Livro;
import com.example.LibTrack.services.BookService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/book")
public class BookController {

    BookService service;

    public BookController(BookService service) {
        this.service = service;
    }


    @PostMapping("/create")
    public ResponseEntity create(@RequestBody Livro data)
    {
        return service.Create(data);
    }



}
