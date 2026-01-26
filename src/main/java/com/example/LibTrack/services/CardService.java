package com.example.LibTrack.services;

import com.example.LibTrack.API.ScryfallClient;
import com.example.LibTrack.DTOs.Card.ScryfallCardDTO;
import com.example.LibTrack.Mappers.CardMapper;
import com.example.LibTrack.Repositories.CardRepository;
import com.example.LibTrack.entities.Card;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class CardService {

    private final CardRepository cardRepository;

    private final ScryfallClient scryfallClient;

    public CardService(CardRepository cardRepository,ScryfallClient scryfallClient )
    {
        this.cardRepository = cardRepository;
        this.scryfallClient = scryfallClient;
    }

    public ResponseEntity CardFindOrImportByName(String name)
    {
        Card card = (Card)cardRepository.findByNameIgnoreCase(name);

        return ResponseEntity.ok(card!=null?card:ImportFromScryFall(name));
    }

    private Card ImportFromScryFall(String name)
    {
        ScryfallCardDTO dto = scryfallClient.findByExactName(name).block();

        Card card = CardMapper.fromDTO(dto);
        return cardRepository.save(card);

    }


}
