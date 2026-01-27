package com.example.LibTrack.controllers;

import com.example.LibTrack.DTOs.Product.ProductDTO;
import com.example.LibTrack.entities.Product;
import com.example.LibTrack.services.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/product")
public class ProductController {

    ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }

    @PostMapping("/create")
    public ResponseEntity create(@RequestBody ProductDTO productDTO)
    {
        service.create(productDTO);
        return ResponseEntity.ok().build();
    }
}
