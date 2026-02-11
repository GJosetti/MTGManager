package com.example.LibTrack.Repositories;

import com.example.LibTrack.Enums.Condition;
import com.example.LibTrack.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("""
SELECT p
FROM Product p
JOIN p.card c
WHERE (:name IS NULL OR LOWER(c.name) LIKE LOWER(CONCAT('%', :name, '%')))
AND (:type IS NULL OR LOWER(c.typeLine) = LOWER(:type))
AND (:condition IS NULL OR p.condition = :condition)
AND (:mana IS NULL OR c.manaCost LIKE CONCAT('%', :mana, '%'))
AND (:minPrice IS NULL OR p.buyPrice > :minPrice)
AND (:maxPrice IS NULL OR p.buyPrice < :maxPrice)
""")
    List<Product> findWithFilters(
            @Param("name") String name,
            @Param("type") String type,
            @Param("condition") Condition condition,
            @Param("mana") String mana,
            @Param("minPrice") BigDecimal minPrice,
            @Param("maxPrice") BigDecimal maxPrice
    );

}
