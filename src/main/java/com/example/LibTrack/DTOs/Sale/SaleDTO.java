package com.example.LibTrack.DTOs.Sale;


import lombok.Data;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

@Data
public class SaleDTO {

    private Long clientId;
    private List<SaleItemRequestDTO> items;
    private String clientName;
    private BigDecimal totalValue;
    private Instant createdAt;
    private String paymentMethod;
    private String status;

}
