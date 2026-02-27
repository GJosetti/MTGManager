package com.example.LibTrack.controllers;


import com.example.LibTrack.DTOs.Sale.SaleDTO;
import com.example.LibTrack.entities.Sale;
import com.example.LibTrack.services.SaleService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping( "/listRecent")
    public ResponseEntity listRecentSales(@RequestParam int months)
    {
        return service.listRecentSales(months);
    }

    @PostMapping("/finish")
    public ResponseEntity finishSale(@RequestBody long id)
    {
        return service.finishSale(id);
    }

}
