package com.example.LibTrack.DTOs.Card;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.math.BigDecimal;

public class PricesDTO {
    private BigDecimal usd;

    @JsonProperty("usd_foil")
    private BigDecimal usdFoil;
}
