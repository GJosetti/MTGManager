package com.example.LibTrack.controllers;


import com.example.LibTrack.DTOs.Card.SaveCardDTO;
import com.example.LibTrack.entities.Card;
import com.example.LibTrack.services.CardService;
import com.example.LibTrack.services.ProductService;
import jakarta.servlet.ServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/card")
public class CardController {

    private final CardService cardService;

    private final ProductService productService;

    public CardController(CardService cardService, ProductService productService)

    {
        this.cardService = cardService;
        this.productService = productService;
    }

    @PostMapping("/save")
    public ResponseEntity SaveCards(@RequestBody String name)
    {
        return cardService.CardFindOrImportByName(name);
    }

    @PostMapping("/manualsave")
    public ResponseEntity SaveCardsManually (@RequestBody SaveCardDTO data)
    {

        return cardService.SaveManually(data);
    }

    @GetMapping("/search")
    public ResponseEntity SearchCards(@RequestParam String name)
    {
        return cardService.searchCards(name);
    }

    @PostMapping("/update")
    public ResponseEntity UpdateCards(@RequestBody Long id)
    {
        return cardService.update(id);
    }

    @GetMapping("/searchname")
    public ResponseEntity SearchCardName(@RequestBody String name, ServletRequest servletRequest)
    {
        return cardService.searchCardByNameOnFront(name);
    }

    @GetMapping("/searchByOracleId")
    public ResponseEntity searchByOracleId(@RequestParam String id)
    {
        return cardService.searchCardsByOracleId(id);
    }

    @GetMapping("/searchUnique")
    public ResponseEntity searchCardsForUsers(@RequestParam String name)
    {
        return cardService.searchCardsForUsers(name);
    }


}
