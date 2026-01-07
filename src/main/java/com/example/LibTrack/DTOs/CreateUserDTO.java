package com.example.LibTrack.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateUserDTO {


    String nome;
    String email;
    String cpf;
    int role_id;

}
