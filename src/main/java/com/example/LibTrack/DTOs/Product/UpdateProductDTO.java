package com.example.LibTrack.DTOs.Product;

import lombok.Data;

import java.math.BigDecimal;
import java.time.Instant;

@Data
public class UpdateProductDTO {

    private Long id;

    private String nomeProduto;

    private String ImgProdutoUrl;

    private String condition;


    private String language;

    private Boolean foil;


    private Long quantity;


    private BigDecimal buyPrice;


    private BigDecimal sellPrice;


    private Instant lastPriceUpdate;

    private String productType;

}
