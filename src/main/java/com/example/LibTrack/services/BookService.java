package com.example.LibTrack.services;

import com.example.LibTrack.DTOs.Book.CreateBookDTO;
import com.example.LibTrack.Repositories.IBookRepository;
import com.example.LibTrack.entities.Livro;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class BookService {

    private IBookRepository repository;

    public BookService (IBookRepository repository)
    {
        this.repository = repository;
    }

    public ResponseEntity Create (Livro livro)
    {
        repository.save(livro);
        return ResponseEntity.ok().build();
    }


}
