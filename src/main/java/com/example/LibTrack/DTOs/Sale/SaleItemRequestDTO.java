package com.example.LibTrack.DTOs.Sale;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class SaleItemRequestDTO{

    private Long productId;
    private Long quantity;


}
