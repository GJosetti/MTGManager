package com.example.LibTrack.services;

import com.example.LibTrack.DTOs.Sale.*;
import com.example.LibTrack.Mappers.SaleMapper;
import com.example.LibTrack.Repositories.ProductRepository;
import com.example.LibTrack.Repositories.SaleRepository;
import com.example.LibTrack.Repositories.UserRepository;
import com.example.LibTrack.entities.Product;
import com.example.LibTrack.entities.Sale;
import com.example.LibTrack.entities.SaleItem;
import com.example.LibTrack.entities.User;
import jakarta.transaction.Transactional;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;

@Service
public class SaleService {

    SaleRepository repository;
    UserRepository userRepository;
    ProductRepository productRepository;

    public SaleService(SaleRepository repository, UserRepository userRepository, ProductRepository productRepository) {
        this.repository = repository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    // Helper para pegar o nome do produto independente do tipo
    private String getProductName(Product product) {
        if (product.getCard() != null) {
            return product.getCard().getName();
        }
        return product.getNomeProduto();
    }

    public ResponseEntity create(SaleDTO dto) {
        User client = userRepository.findById(dto.getClientId()).orElseThrow();
        Sale sale = SaleMapper.fromDTO(dto, client);

        List<SaleItem> items = new ArrayList<>();

        for (SaleItemRequestDTO itemDTO : dto.getItems()) {
            Product product = productRepository.findById(itemDTO.getProductId()).orElseThrow();

            if (product.getQuantity() < itemDTO.getQuantity()) {
                return ResponseEntity.noContent().build();
            }

            SaleItem saleItem = new SaleItem();
            saleItem.setSale(sale);
            saleItem.setProduct(product);
            saleItem.setQuantity(itemDTO.getQuantity());

            product.setQuantity(product.getQuantity() - itemDTO.getQuantity());
            productRepository.save(product);
            items.add(saleItem);
        }

        sale.setItems(items);

        BigDecimal total = items.stream()
                .map(i -> i.getProduct().getSellPrice()
                        .multiply(BigDecimal.valueOf(i.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        sale.setTotalValue(total);
        repository.save(sale);

        return ResponseEntity.ok().build();
    }

    public ResponseEntity update(UpdateStatusSaleDTO dto) {
        Sale sale = repository.findById(dto.getId()).orElseThrow();
        sale.setStatus(dto.getStatus());
        repository.save(sale);
        return ResponseEntity.ok().build();
    }

    public ResponseEntity finishSale(long id) {
        Sale sale = repository.findById(id).orElseThrow();
        sale.setFinishedAt(Instant.now());
        sale.setStatus("FINISHED");
        repository.save(sale);
        return ResponseEntity.ok().build();
    }

    public ResponseEntity listRecentSales(int months) {
        LocalDateTime threeMonthsAgoLdt = LocalDateTime.now().minusMonths(3);

        Instant threeMonthsAgo = threeMonthsAgoLdt
                .atZone(ZoneId.systemDefault())
                .toInstant();

        List<Sale> sales = repository.findFinishedSalesAfterDate(threeMonthsAgo);

        List<SaleResponseDTO> response = sales.stream()
                .map(sale -> new SaleResponseDTO(
                        sale.getId(),
                        sale.getClient(),
                        sale.getTotalValue(),
                        sale.getCreatedAt(),
                        sale.getFinishedAt(),
                        sale.getPaymentMethod(),
                        sale.getStatus(),
                        sale.getItems().stream()
                                .map(item -> new SaleItemResponse(
                                        item.getId(),
                                        item.getQuantity(),
                                        getProductName(item.getProduct()),
                                        item.getProduct().getSellPrice(),
                                        item.getStatus()
                                ))
                                .toList()
                ))
                .toList();

        return ResponseEntity.ok(response);
    }

    @Transactional
    public ResponseEntity separateSaleItem(Long itemId) {
        repository.updateSaleItemStatus(itemId);
        return ResponseEntity.ok().build();
    }

    public ResponseEntity listReserved() {
        List<Sale> sales = repository.findByFinishedAtIsNullOrderByCreatedAtDesc();

        List<SaleResponseDTO> response = sales.stream()
                .map(sale -> new SaleResponseDTO(
                        sale.getId(),
                        sale.getClient(),
                        sale.getTotalValue(),
                        sale.getCreatedAt(),
                        sale.getFinishedAt(),
                        sale.getPaymentMethod(),
                        sale.getStatus(),
                        sale.getItems().stream()
                                .map(item -> new SaleItemResponse(
                                        item.getId(),
                                        item.getQuantity(),
                                        getProductName(item.getProduct()),
                                        item.getProduct().getSellPrice(),
                                        item.getStatus()
                                ))
                                .toList()
                ))
                .toList();

        return ResponseEntity.ok(response);
    }
}