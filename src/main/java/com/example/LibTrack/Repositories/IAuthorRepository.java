package com.example.LibTrack.Repositories;

import com.example.LibTrack.entities.Autor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IAuthorRepository extends JpaRepository<Autor,Long> {


}
