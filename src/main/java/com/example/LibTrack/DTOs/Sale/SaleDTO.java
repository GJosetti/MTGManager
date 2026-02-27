package com.example.LibTrack.DTOs.Sale;


import lombok.Data;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

@Data
public class SaleDTO {


    private Long clientId;
    private List<SaleItemRequestDTO> items;
    private BigDecimal totalValue;
    private Instant createdAt;
    private Instant finishedAt;
    private String paymentMethod;
    private String status;

}
