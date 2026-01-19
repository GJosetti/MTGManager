package com.example.LibTrack.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDate;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(
    name = "books",
    schema = "public"
)
public class Livro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(name = "title", nullable = false, length = 200)
    private String title;


    @Column(name = "author_id")
    private Long authorId;

    @Column(name = "release_date")
    private LocalDate releaseDate;

    @Column(name = "isbn", length = 20)
    private String isbn;

    @Column(name = "section_id")
    private Long sectionId;

    @Column(name = "description", length = 500)
    private String description;

    @Column(name = "image")
    private String image;

    @ColumnDefault("true")
    @Column(name = "available")
    private Boolean available;

}
