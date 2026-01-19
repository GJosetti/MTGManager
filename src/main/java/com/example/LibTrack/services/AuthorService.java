package com.example.LibTrack.services;

import com.example.LibTrack.Repositories.IAuthorRepository;
import com.example.LibTrack.entities.Autor;
import com.example.LibTrack.entities.User;
import com.example.LibTrack.interfaces.IAuthorService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthorService implements IAuthorService {


    IAuthorRepository repository;

    public AuthorService(IAuthorRepository repository)
    {
        this.repository = repository;
    }

    @Override
    public ResponseEntity create(Autor autor)
    {
        repository.save(autor);
        return ResponseEntity.ok().build();
    }

    @Override
    public ResponseEntity update(Autor autor) {
        repository.save(autor);
        return ResponseEntity.ok().build();
    }

    @Override
    public ResponseEntity delete(Long id) {
        Autor autor = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Não foi encontrado nenhum Autor com esse ID"));

        repository.delete(autor);
        return ResponseEntity.ok().build();
    }

    @Override
    public List<Autor> listAll() {
        return this.repository.findAll();
    }


}
