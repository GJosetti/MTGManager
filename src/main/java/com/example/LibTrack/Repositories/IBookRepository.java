package com.example.LibTrack.Repositories;

import com.example.LibTrack.entities.Livro;
import com.example.LibTrack.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.awt.print.Book;
@Repository
public interface IBookRepository extends JpaRepository<Livro,Long> {
}
