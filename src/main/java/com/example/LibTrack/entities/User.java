package com.example.LibTrack.entities;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.antlr.v4.runtime.misc.NotNull;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Data
@Entity
@NoArgsConstructor

@Table(
        name = "users",
        schema = "public"
)
public class User implements UserDetails {

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

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    public String getUsername() {
        return email;
    }
}
