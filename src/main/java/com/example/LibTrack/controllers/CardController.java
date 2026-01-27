package com.example.LibTrack.controllers;


import com.example.LibTrack.entities.Card;
import com.example.LibTrack.services.CardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/card")
public class CardController {

    private final CardService cardService;

    public CardController(CardService cardService)
    {
        this.cardService = cardService;
    }

    @PostMapping("/save")
    public ResponseEntity SaveCards(@RequestBody String name)
    {
        return cardService.CardFindOrImportByName(name);
    }

    @GetMapping("/search")
    public ResponseEntity SearchCards(@RequestBody String name)
    {
        return cardService.searchCards(name);
    }
}
