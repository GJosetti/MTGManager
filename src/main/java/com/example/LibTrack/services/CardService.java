package com.example.LibTrack.services;

import com.example.LibTrack.API.ScryfallClient;
import com.example.LibTrack.DTOs.Card.SaveCardDTO;
import com.example.LibTrack.DTOs.Card.ScryfallCardDTO;
import com.example.LibTrack.DTOs.Product.ProductDTO;
import com.example.LibTrack.Mappers.CardMapper;
import com.example.LibTrack.Repositories.CardRepository;
import com.example.LibTrack.Repositories.ProductRepository;
import com.example.LibTrack.entities.Card;
import com.example.LibTrack.entities.Product;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class CardService {

    private final CardRepository cardRepository;

    private final ProductRepository productRepository;

    private final ScryfallClient scryfallClient;

    public CardService(CardRepository cardRepository,ScryfallClient scryfallClient, ProductRepository productRepository )
    {
        this.productRepository = productRepository;
        this.cardRepository = cardRepository;
        this.scryfallClient = scryfallClient;
    }

    public ResponseEntity<List<Card>> searchCards(String name)
    {
        List<Card> cards = List.of(cardRepository.findByNameContainingIgnoreCase(name));

        if(cards.size() >= 5)
        {
            return ResponseEntity.ok(cards);
        }

        List<ScryfallCardDTO> dtos = scryfallClient.findByNameLimited(name);

        List<Card> newCards = dtos.stream()
                .map(CardMapper::fromDTO)
                .toList();

        Set<String> processedOracle = new HashSet<>();

        for(Card card : newCards)
        {
            String oracleId = card.getOracleID();

            if(processedOracle.contains(oracleId))
                continue;

            processedOracle.add(oracleId);

            List<Card> sameCards = scryfallClient.findAllByOracleID(oracleId)
                    .stream()
                    .map(CardMapper::fromDTO)
                    .toList();

            List<Card> toSave = sameCards.stream()
                    .filter(c -> !cardRepository.existsByScryfallID(c.getScryfallID()))
                    .toList();

            cardRepository.saveAll(toSave);
        }

        return !newCards.isEmpty()
                ? ResponseEntity.ok(newCards)
                : ResponseEntity.status(204).build();
    }


   public ResponseEntity searchCardsByOracleId(String id)
   {
       List<Card> cards = cardRepository.findAllByOracleID(id);

       return ResponseEntity.ok(cards);
   }


   public ResponseEntity SaveManually(SaveCardDTO dto)
   {
       Card card = CardMapper.fromSaveDTO(dto);
       cardRepository.save(card);
       return ResponseEntity.ok().build();
   }

    //EXACT NAME
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

    public ResponseEntity update(Long id)
    {
        String cardName = cardRepository.findById(id).orElseThrow(()-> new RuntimeException("Carta com ID não encontrado")).getName();
        return ResponseEntity.ok(ImportFromScryFall(cardName));
    }

    public ResponseEntity searchCardByNameOnFront(String name)
    {
        List<ScryfallCardDTO> results = scryfallClient.findByNameLimited(name);
        return ResponseEntity.ok(results);
    }


}
