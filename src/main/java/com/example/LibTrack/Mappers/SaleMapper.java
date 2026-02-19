package com.example.LibTrack.Mappers;

import com.example.LibTrack.DTOs.Sale.SaleDTO;
import com.example.LibTrack.entities.Sale;
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


}
