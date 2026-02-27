package com.example.LibTrack.DTOs.Sale;


import java.math.BigDecimal;

public record SaleItemResponse(
        Long id,
        Long quantity,
        String productName
) {}