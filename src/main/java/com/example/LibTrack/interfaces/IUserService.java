package com.example.LibTrack.interfaces;

import com.example.LibTrack.DTOs.User.CreateUserDTO;
import com.example.LibTrack.DTOs.User.UpdateUserDTO;
import com.example.LibTrack.entities.User;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface IUserService  {

    public ResponseEntity createUser(CreateUserDTO createUserDto);

    public List<User> listUserById(int role_id);

    public List<User> ListAllUsers();

    public ResponseEntity deleteUser(Long id);

    public ResponseEntity updateUser(UpdateUserDTO updateUserDTO);
}
