package com.example.LibTrack.Repositories;

import com.example.LibTrack.entities.Livro;
import com.example.LibTrack.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.awt.print.Book;

public interface IBookRepository extends JpaRepository<Livro,Long> {
}
