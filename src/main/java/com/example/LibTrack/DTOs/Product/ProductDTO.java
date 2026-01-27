package com.example.LibTrack.DTOs.Product;

import com.example.LibTrack.Enums.Condition;
import com.example.LibTrack.entities.Card;
import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.Instant;

@Data
public class ProductDTO {


    private Long card_id;


    private Condition condition;


    private String language;

    private Boolean foil;


    private Long quantity;


    private BigDecimal buyPrice;


    private BigDecimal sellPrice;


    private Instant lastPriceUpdate;


}
