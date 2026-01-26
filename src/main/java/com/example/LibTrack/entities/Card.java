package com.example.LibTrack.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "cards")
public class Card {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "mana_cost", length = 50)
    private String manaCost;

    @Column(name = "oracle_text", length = Integer.MAX_VALUE)
    private String oracleText;

    @Column(name = "type_line")
    private String typeLine;

    @Column(name = "rarity", length = 50)
    private String rarity;

    @Column(name = "set", length = 20)
    private String set;

    @Column(name = "collector_number", length = 20)
    private String collectorNumber;

    @Column(name = "image_url", length = Integer.MAX_VALUE)
    private String imageUrl;


}