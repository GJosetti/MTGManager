package com.example.LibTrack.services;

import com.example.LibTrack.DTOs.Sale.SaleDTO;
import com.example.LibTrack.Mappers.SaleMapper;
import com.example.LibTrack.Repositories.SaleRepository;
import com.example.LibTrack.Repositories.UserRepository;
import com.example.LibTrack.entities.Sale;
import com.example.LibTrack.entities.User;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;

@Service
public class SaleService {

    SaleRepository repository;

    UserRepository userRepository;

    public SaleService(SaleRepository repository, UserRepository userRepository)
    {
        this.repository = repository;
        this.userRepository = userRepository;
    }

    public ResponseEntity create(SaleDTO dto)
    {
        User client = userRepository.findById(dto.getClientId()).orElseThrow();
        Sale sale = SaleMapper.fromDTO(dto,client);

        repository.save(sale);

        return ResponseEntity.ok().build();

    }


}
