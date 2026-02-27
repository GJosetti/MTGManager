package com.example.LibTrack.DTOs.Sale;

import com.example.LibTrack.entities.User;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

public record SaleResponseDTO(
        Long id,
        User client,
        BigDecimal totalValue,
        Instant createdAt,
        Instant finishedAt,
        String paymentMethod,
        String status,
        List<SaleItemResponse> items
) {}