package com.example.LibTrack.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "sale")
public class Sale {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id")
    private User client;

    @Column(name = "total_value")
    private BigDecimal totalValue;

    @Column(name = "created_at")
    private Instant createdAt;

    @Column(name = "payment_method", columnDefinition = "payment_method_enum")
    private Object paymentMethod;

    @Column(name = "status", columnDefinition = "sale_status_enum")
    private Object status;


}