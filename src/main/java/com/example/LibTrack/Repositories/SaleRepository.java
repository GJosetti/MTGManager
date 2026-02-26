package com.example.LibTrack.Repositories;

import com.example.LibTrack.entities.Sale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface SaleRepository extends JpaRepository<Sale,Long> {


    public List<Sale> findByCreatedAtAfter(Instant date);


}
