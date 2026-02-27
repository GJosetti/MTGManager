package com.example.LibTrack.Mappers;

import com.example.LibTrack.DTOs.Sale.SaleDTO;
import com.example.LibTrack.DTOs.Sale.SaleItemRequestDTO;
import com.example.LibTrack.entities.Product;
import com.example.LibTrack.entities.Sale;
import com.example.LibTrack.entities.SaleItem;
import com.example.LibTrack.entities.User;

import java.time.Instant;

public class SaleMapper {


    public static Sale fromDTO(SaleDTO dto, User client)
    {
        Sale sale = new Sale();

        sale.setClient(client);
        sale.setStatus(dto.getStatus());
        sale.setCreatedAt(dto.getCreatedAt());
        sale.setTotalValue(dto.getTotalValue());
        sale.setPaymentMethod(dto.getPaymentMethod());
        sale.setCreatedAt(Instant.now());

        return sale;

    }

    public static SaleItem fromDTO(SaleItemRequestDTO dto, Sale sale, Product product)
    {
        SaleItem saleItem = new SaleItem();

        saleItem.setSale(sale);
        saleItem.setProduct(product);
        saleItem.setQuantity(dto.getQuantity());


        return saleItem;


    }


}
