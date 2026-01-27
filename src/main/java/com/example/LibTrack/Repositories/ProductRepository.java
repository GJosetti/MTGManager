package com.example.LibTrack.Repositories;

import com.example.LibTrack.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
