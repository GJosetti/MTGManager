package com.example.LibTrack.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

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

    @Column(name = "condition", columnDefinition = "product_condition_enum")
    private Object condition;

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


}