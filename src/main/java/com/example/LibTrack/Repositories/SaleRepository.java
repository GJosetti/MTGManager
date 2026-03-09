package com.example.LibTrack.Repositories;

import com.example.LibTrack.entities.Sale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface SaleRepository extends JpaRepository<Sale,Long> {


    @Query("""
    SELECT s
    FROM Sale s
    WHERE s.createdAt > :date
    AND s.finishedAt IS NOT NULL
    ORDER BY s.createdAt DESC
""")
    List<Sale> findFinishedSalesAfterDate(@Param("date") Instant date);

    List<Sale> findByFinishedAtIsNullOrderByCreatedAtDesc();

    @Modifying
    @Query("UPDATE SaleItem s SET s.status = 'SEPARATED' WHERE s.id = :id")
    void updateSaleItemStatus(@Param("id") Long id);
}
