package com.example.LibTrack.DTOs.Sale;


import lombok.Data;

import java.math.BigDecimal;
import java.time.Instant;

@Data
public class SaleDTO {

    private Long clientId;
    private String clientName;
    private BigDecimal totalValue;
    private Instant createdAt;
    private String paymentMethod;
    private String status;

}
