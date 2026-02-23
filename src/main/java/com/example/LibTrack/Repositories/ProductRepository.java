package com.example.LibTrack.Repositories;

import com.example.LibTrack.Enums.Condition;
import com.example.LibTrack.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query(value = """
SELECT p.* 
FROM products p
JOIN cards c ON c.id = p.card_id
WHERE (:name IS NULL OR LOWER(c.name) LIKE LOWER(CONCAT('%', :name, '%')))
AND (:type IS NULL OR LOWER(c.type_line) = LOWER(:type))
AND (:condition IS NULL OR p.condition = :condition)
AND (:mana IS NULL OR c.mana_cost LIKE CONCAT('%', :mana, '%'))
AND (:minPrice IS NULL OR p.buy_price > :minPrice)
AND (:maxPrice IS NULL OR p.buy_price < :maxPrice)
AND (p.product_type = 'CARD')
""", nativeQuery = true)
    List<Product> findWithFilters(
            @Param("name") String name,
            @Param("type") String type,
            @Param("condition") String condition,
            @Param("mana") String mana,
            @Param("minPrice") BigDecimal minPrice,
            @Param("maxPrice") BigDecimal maxPrice
    );


    @Query("SELECT SUM(c.quantity) FROM Product c WHERE c.productType = :type ")
    Long sumQuantidade(@Param("type") String type);

}
