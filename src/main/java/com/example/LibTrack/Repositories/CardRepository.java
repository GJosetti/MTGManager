package com.example.LibTrack.Repositories;

import com.example.LibTrack.entities.Card;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

public interface CardRepository extends JpaRepository<Card, Long> {

    Optional<Card> findByName(String name);

    List<Card> findByNameIgnoreCase(String name);

    boolean existsByName(String name);

    List<Card> findByNameContaining(String name);

    List<Card> findByNameContainingIgnoreCase(String name);

    List<Card> findAllByOracleID(String id);

    boolean existsByScryfallID(String id);

    List<Card> findAllByNameStartingWithIgnoreCase(String name);
}
