package com.example.LibTrack.DTOs.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateUserDTO {


    String nome;
    String password;
    String email;
    String cpf;
    int role_id;

}
