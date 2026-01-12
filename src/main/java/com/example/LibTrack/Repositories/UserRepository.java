package com.example.LibTrack.Repositories;

import com.example.LibTrack.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long>{


    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);
}
