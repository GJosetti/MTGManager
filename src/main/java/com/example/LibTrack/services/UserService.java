package com.example.LibTrack.services;

import com.example.LibTrack.DTOs.CreateUserDTO;
import com.example.LibTrack.Mappers.UserMapper;
import com.example.LibTrack.Repositories.UserRepository;
import com.example.LibTrack.entities.User;
import com.example.LibTrack.interfaces.IUserService;
import org.springframework.stereotype.Service;


@Service
public class UserService implements IUserService {


    UserRepository userRepository;

    public UserService(UserRepository userRepository)
    {
        this.userRepository = userRepository;
    }


    @Override
    public CreateUserDTO createUser(CreateUserDTO createUserDto) {

        User user = UserMapper.mapCreateUserDTOtoUser(createUserDto);

        CreateUserDTO newUser = UserMapper.mapUserToCreateUserDTO(userRepository.save(user));

        return newUser;
    }
}
