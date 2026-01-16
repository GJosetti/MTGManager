package com.example.LibTrack.services;

import com.example.LibTrack.DTOs.CreateUserDTO;
import com.example.LibTrack.DTOs.UpdateUserDTO;
import com.example.LibTrack.Mappers.UserMapper;
import com.example.LibTrack.Repositories.UserRepository;
import com.example.LibTrack.entities.User;
import com.example.LibTrack.interfaces.IUserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class UserService implements IUserService {


    UserRepository repository;

    public UserService(UserRepository userRepository)
    {
        this.repository = userRepository;
    }


    @Override
    public ResponseEntity createUser(CreateUserDTO data) {

        if(this.repository.existsByEmail(data.getEmail())) {return ResponseEntity.badRequest().body("Email já cadastrado -> " + data.getEmail() );}

        String encryptedPassword = new BCryptPasswordEncoder().encode(data.getPassword());

        data.setPassword(encryptedPassword);

        User user = UserMapper.mapCreateUserDTOtoUser(data);

       repository.save(user);

        return ResponseEntity.ok().build();
    }

    public ResponseEntity updateUser(UpdateUserDTO updateUserDTO)
    {
        User user = repository.findById(updateUserDTO.getId())
                .orElseThrow(() -> new RuntimeException("Não foi encontrado nenhum usuário com esse ID"));

        user.setName(updateUserDTO.getNome());
        user.setCpf(updateUserDTO.getCpf());
        user.setEmail(updateUserDTO.getEmail());


        repository.save(user);
        return ResponseEntity.ok().build();
    }

    public ResponseEntity deleteUser(Long id)
    {
        User user = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Não foi encontrado nenhum usuário com esse ID"));

        repository.delete(user);
        return ResponseEntity.ok().build();
    }


    public List<User> ListAllUsers()
    {
        return this.repository.findAll();
    }


}
