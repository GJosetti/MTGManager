package com.example.LibTrack.services;

import com.example.LibTrack.DTOs.Product.ProductDTO;
import com.example.LibTrack.Mappers.ProductMapper;
import com.example.LibTrack.Repositories.CardRepository;
import com.example.LibTrack.Repositories.ProductRepository;
import com.example.LibTrack.entities.Card;
import com.example.LibTrack.entities.Product;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


@Service
public class ProductService {

    ProductRepository repository;
    CardRepository cardRepository;

    public ProductService(ProductRepository repository,  CardRepository cardRepository) {
        this.repository = repository;
        this.cardRepository = cardRepository;
    }

    public ResponseEntity create(ProductDTO dto)
    {

        Card card = cardRepository.findById(dto.getCard_id()).orElse(null);

        if(card == null)
        {
            return ResponseEntity.notFound().build();
        }


        Product product = new Product();
        product.setCard(card);
        product.setLanguage(dto.getLanguage());
        product.setFoil(dto.getFoil());
        product.setQuantity(dto.getQuantity());
        product.setBuyPrice(dto.getBuyPrice());
        product.setSellPrice(dto.getSellPrice());
        product.setCondition(dto.getCondition());

        repository.save(product);

        return ResponseEntity.ok().build();

    }

    public ResponseEntity update(ProductDTO dto)
    {
        Card card = cardRepository.findById(dto.getCard_id()).orElse(null);

        if(card == null)
        {
            return ResponseEntity.notFound().build();
        }

        Product product = new Product();
        product.setCard(card);
        product.setLanguage(dto.getLanguage());
        product.setFoil(dto.getFoil());
        product.setQuantity(dto.getQuantity());
        product.setBuyPrice(dto.getBuyPrice());
        product.setSellPrice(dto.getSellPrice());
        product.setCondition(dto.getCondition());

        repository.save(product);

        return ResponseEntity.ok().build();
    }

    public ResponseEntity delete(Long id)
    {
        Product product = repository.findById(id).orElse(null);

        if(product == null)
        {
            return ResponseEntity.notFound().build();
        }
        repository.delete(product);
        return ResponseEntity.ok().build();
    }

}
