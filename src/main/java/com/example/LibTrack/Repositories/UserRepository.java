package com.example.LibTrack.Repositories;

import com.example.LibTrack.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User,Long>{


    boolean findByEmail(String email);

    boolean existsByEmail(String email);
}
