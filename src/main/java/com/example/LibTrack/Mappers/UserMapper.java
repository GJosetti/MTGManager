package com.example.LibTrack.Mappers;

import com.example.LibTrack.DTOs.CreateUserDTO;
import com.example.LibTrack.entities.User;

public class UserMapper {

    public static User mapCreateUserDTOtoUser(CreateUserDTO createUserDTO)
    {

        return new User(
        createUserDTO.getNome(),
        createUserDTO.getCpf(),
        createUserDTO.getEmail(),
        createUserDTO.getRole_id());

    }
    public static CreateUserDTO mapUserToCreateUserDTO(User user)
    {
        return new CreateUserDTO(
                user.getName(),
                user.getCpf(),
                user.getEmail(),
                user.getRole_id());


    }


}
