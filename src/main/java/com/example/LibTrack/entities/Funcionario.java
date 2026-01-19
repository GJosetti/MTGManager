package com.example.LibTrack.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "funcionarios")
public class Funcionario {
    @Id
    @Column(name = "user_id", nullable = false)
    private Long id;

    //TODO [Reverse Engineering] generate columns from DB
}