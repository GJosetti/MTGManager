package com.example.LibTrack.controllers;


import com.example.LibTrack.entities.Sale;
import com.example.LibTrack.services.SaleService;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RestController;

@RestController("/api/sale")
public class SaleController {

    SaleService service;

    public  SaleController (SaleService service)
    {
        this.service = service;
    }

}
