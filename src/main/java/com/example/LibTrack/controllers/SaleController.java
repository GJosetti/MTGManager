package com.example.LibTrack.controllers;


import com.example.LibTrack.DTOs.Sale.SaleDTO;
import com.example.LibTrack.entities.Sale;
import com.example.LibTrack.services.SaleService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/sale")
public class SaleController {

    SaleService service;

    public SaleController (SaleService service)
    {
        this.service = service;
    }

    @PostMapping("/create")
    public ResponseEntity createSale (@RequestBody SaleDTO data)
    {
        return service.create(data);
    }

}
