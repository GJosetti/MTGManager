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

import java.util.List;
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
       //PROCURA PRIMEIRO NO BANCO
       List<Card> _cards = List.of(cardRepository.findByNameContainingIgnoreCase(name));
       if(!_cards.isEmpty())
       {
           return ResponseEntity.ok(_cards);
       }

       //DEPOIS VAI PARA O SCRYFALL
       List<ScryfallCardDTO> dtos = scryfallClient.findByNameLimited(name);

        List<Card> cards = dtos.stream()
               .map(CardMapper::fromDTO)
               .toList();

        for(Card card : cards)
        {
            if(!cardRepository.existsByName(card.getName()))
            {
                cardRepository.save(card);

                Product product = new Product();
                product.setCard(card);
                product.setProductType("CARD");
                product.setQuantity(0L);
                productRepository.save(product);
            }
        }

        return !cards.isEmpty()?ResponseEntity.ok(cards):ResponseEntity.status(204).build();

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
