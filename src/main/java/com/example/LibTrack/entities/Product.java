package com.example.LibTrack.entities;

import com.example.LibTrack.Enums.Condition;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.math.BigDecimal;
import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "card_id")
    private Card card;

    @Column(name = "condition")
    private String condition;

    @Column(name = "language", length = 20)
    private String language;

    @Column(name = "foil")
    private Boolean foil;

    @Column(name = "quantity")
    private Long quantity;

    @Column(name = "buy_price")
    private BigDecimal buyPrice;

    @Column(name = "sell_price")
    private BigDecimal sellPrice;

    @Column(name = "last_price_update")
    private Instant lastPriceUpdate;

    @Column(name = "product_type")
    private String productType;


}