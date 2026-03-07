package com.example.LibTrack.Repositories;

import com.example.LibTrack.entities.Card;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CardRepository extends JpaRepository<Card,Long> {


    Object findByName(String name);

    Object findByNameIgnoreCase(String name);

    boolean existsByName(String name);

    Card[] findByNameContaining(String name);

    List<Card> findAllByOracleID(String id);

    Card[] findByNameContainingIgnoreCase(String name);

    boolean existsByScryfallID(String id);

}
