package com.example.LibTrack.services;

import com.example.LibTrack.DTOs.Sale.SaleDTO;
import com.example.LibTrack.DTOs.Sale.SaleItemRequestDTO;
import com.example.LibTrack.DTOs.Sale.SaleItemResponse;
import com.example.LibTrack.DTOs.Sale.SaleResponseDTO;
import com.example.LibTrack.Mappers.SaleMapper;
import com.example.LibTrack.Repositories.ProductRepository;
import com.example.LibTrack.Repositories.SaleRepository;
import com.example.LibTrack.Repositories.UserRepository;
import com.example.LibTrack.entities.Product;
import com.example.LibTrack.entities.Sale;
import com.example.LibTrack.entities.SaleItem;
import com.example.LibTrack.entities.User;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;

import java.math.BigDecimal;
import java.sql.Time;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

@Service
public class SaleService {

    SaleRepository repository;

    UserRepository userRepository;

    ProductRepository productRepository;

    public SaleService(SaleRepository repository, UserRepository userRepository,ProductRepository productRepository)
    {
        this.repository = repository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    public ResponseEntity create(SaleDTO dto)
    {

        User client = userRepository.findById(dto.getClientId())
                .orElseThrow();


        Sale sale = SaleMapper.fromDTO(dto, client);


        List<SaleItem> items = new ArrayList<>();

        for (SaleItemRequestDTO itemDTO : dto.getItems())
        {
            Product product = productRepository.findById(itemDTO.getProductId())
                    .orElseThrow();

            SaleItem saleItem = new SaleItem();
            saleItem.setSale(sale);
            saleItem.setProduct(product);
            saleItem.setQuantity(itemDTO.getQuantity());


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

    public ResponseEntity finishSale(long id)
    {
        Sale sale = repository.findById(id).orElseThrow();

        sale.setFinishedAt(Instant.now());

        repository.save(sale);

        return ResponseEntity.ok().build();
    }

    public ResponseEntity listRecentSales(int months)
    {
        LocalDateTime threeMonthsAgoLdt = LocalDateTime.now().minusMonths(3);

        Instant threeMonthsAgo = threeMonthsAgoLdt
                .atZone(ZoneId.systemDefault())
                .toInstant();

        List<Sale> sales = repository.findByCreatedAtAfterOrderByCreatedAtDesc(threeMonthsAgo);


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
                                        item.getProduct().getCard().getName(),
                                        item.getProduct().getSellPrice()
                                ))
                                .toList()
                ))
                .toList();

        return ResponseEntity.ok(response);
    }



}
