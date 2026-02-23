package com.example.LibTrack.controllers;

import com.example.LibTrack.DTOs.Product.ProductDTO;
import com.example.LibTrack.Enums.Condition;
import com.example.LibTrack.entities.Product;
import com.example.LibTrack.services.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

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
        return service.create(productDTO);
    }

    @PostMapping("/update")
    public ResponseEntity update(@RequestBody ProductDTO productDTO)
    {
        return service.update(productDTO);
    }
    @PostMapping("/delete")
    public ResponseEntity delete (@RequestBody Long id)
    {
        return service.delete(id);
    }


    @GetMapping("/search")
    public List<Product> getCards(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String type,
            @RequestParam(required = false) Condition condition,
            @RequestParam(required = false) String colors,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice
    ) {
        return service.filterCards(search, type, condition, colors, minPrice, maxPrice);
    }

    @GetMapping("/count")
    public ResponseEntity totalCardQuantity()
    {
        return service.totalCardQuantity();
    }
}
