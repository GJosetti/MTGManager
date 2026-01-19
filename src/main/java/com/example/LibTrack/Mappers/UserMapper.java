package com.example.LibTrack.Mappers;

import com.example.LibTrack.DTOs.User.CreateUserDTO;
import com.example.LibTrack.entities.User;

public class UserMapper {

    public static User mapCreateUserDTOtoUser(CreateUserDTO createUserDTO)
    {

        return new User(
        createUserDTO.getNome(),
        createUserDTO.getPassword(),
        createUserDTO.getEmail(),
        createUserDTO.getCpf(),
        createUserDTO.getRole_id());

    }
    public static CreateUserDTO mapUserToCreateUserDTO(User user)
    {
        return new CreateUserDTO(
                user.getName(),
                user.getPassword(),
                user.getCpf(),
                user.getEmail(),
                user.getRole_id());
    }



}
