package com.example.LibTrack.DTOs.Sale;


import java.math.BigDecimal;

public record SaleItemResponse(
        Long id,
        BigDecimal unitPrice,
        Long quantity,
        String productName
) {}