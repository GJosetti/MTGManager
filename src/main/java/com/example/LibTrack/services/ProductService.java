package com.example.LibTrack.services;

import com.example.LibTrack.DTOs.Product.ProductDTO;
import com.example.LibTrack.DTOs.Product.UpdateProductDTO;
import com.example.LibTrack.Enums.Condition;
import com.example.LibTrack.Mappers.ProductMapper;
import com.example.LibTrack.Repositories.CardRepository;
import com.example.LibTrack.Repositories.ProductRepository;
import com.example.LibTrack.entities.Card;
import com.example.LibTrack.entities.Product;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;


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

        Product product = new Product();

        if(dto.getProductType().equals("CARD"))
        {
            Card card = cardRepository.findById(dto.getCard_id()).orElse(null);
            if(card == null)
            {
                return ResponseEntity.notFound().build();
            }
            product.setCard(card);
            product.setNomeProduto(card.getName());
        }
        else
        {
            product.setNomeProduto(dto.getNomeProduto());
            product.setImgProdutoUrl(dto.getImgProdutoUrl());
        }





        product.setLanguage(dto.getLanguage());
        product.setFoil(dto.getFoil());
        product.setQuantity(dto.getQuantity());
        product.setBuyPrice(dto.getBuyPrice());
        product.setSellPrice(dto.getSellPrice());
        product.setCondition(
                dto.getCondition()
        );
        product.setProductType(dto.getProductType());

        repository.save(product);

        return ResponseEntity.ok().build();

    }

    public List<Product> filterCards(String search, String type, Condition condition, String colors, BigDecimal minPrice, BigDecimal maxPrice) {
        return repository.findWithFilters(search, type, condition != null? condition.name(): null, colors, minPrice,maxPrice);
    }

    public ResponseEntity update(UpdateProductDTO dto)
    {
        Product product = repository.findById(dto.getId()).orElseThrow();
        product.setNomeProduto(dto.getNomeProduto());
        product.setId(dto.getId());
        product.setLanguage(dto.getLanguage());
        product.setFoil(dto.getFoil());
        product.setQuantity(dto.getQuantity());
        product.setBuyPrice(dto.getBuyPrice());
        product.setSellPrice(dto.getSellPrice());
        product.setCondition(dto.getCondition());
        product.setImgProdutoUrl(dto.getImgProdutoUrl());


        repository.save(product);

        return ResponseEntity.ok().build();
    }

    public ResponseEntity searchCardsByOracleId(String id)
    {
        List<Product> products = repository.findAllByCardOracleID(id);

        return ResponseEntity.ok(products);
    }

    public ResponseEntity searchByType(String type)
    {
        List<Product> products = repository.findAllByProductType(type);

        return ResponseEntity.ok(products);

    }

    public ResponseEntity delete(Long id)
    {
        Product product = repository.findById(id).orElseThrow();

        if(product == null)
        {
            return ResponseEntity.notFound().build();
        }
        repository.delete(product);
        return ResponseEntity.ok().build();
    }

    public ResponseEntity totalCardQuantity()
    {
        long count = repository.sumQuantidade("CARD");
        return ResponseEntity.ok(count);
    }

}
