package com.example.LibTrack.services;

import com.example.LibTrack.Repositories.SaleRepository;
import org.springframework.stereotype.Service;

@Service
public class SaleService {

    SaleRepository repository;

    public SaleService(SaleRepository repository)
    {
        this.repository = repository;
    }

}
