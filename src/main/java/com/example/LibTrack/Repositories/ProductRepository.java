package com.example.LibTrack.Repositories;

import com.example.LibTrack.Enums.Condition;
import com.example.LibTrack.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

//FAZENDO FILTRO
//    @Query("""
//        SELECT p FROM products p
//
//    """)
//    List<Product> searchWithFilter (
//            @Param("name") String name,
//            @Param("type_line") String type,
//            @Param("condition") Condition condition,
//            @Param("mana_cost") String colors,
//            @Param("minPrice") BigDecimal minPrice,
//            @Param("minPrice") BigDecimal maxPrice
//            );

}
