package com.example.LibTrack.DTOs;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
@Data
public class UpdateUserDTO {

    String nome;
    String email;
    String cpf;
    Long id;
}
