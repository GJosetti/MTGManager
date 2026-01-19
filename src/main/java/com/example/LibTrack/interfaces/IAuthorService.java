package com.example.LibTrack.interfaces;

import com.example.LibTrack.entities.Autor;
import com.example.LibTrack.entities.User;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface IAuthorService {

    public ResponseEntity create(Autor autor);

    public ResponseEntity update(Autor autor);

    public ResponseEntity delete(Long id);

    public List<Autor> listAll();

}
