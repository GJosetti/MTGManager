package com.example.LibTrack.entities;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor

@Table(
        name = "users",
        schema = "public"
)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @Column(name = "nome")
    String name;

    String password;
    String email;
    String cpf;
    int role_id;


    public User(String name, String password, String email, String cpf, int role_id)
    {
        this.name = name;
        this.password = password;
        this.email = email;
        this.cpf = cpf;
        this.role_id = role_id;

    }

}
