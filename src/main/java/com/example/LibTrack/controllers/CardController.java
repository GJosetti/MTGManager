package com.example.LibTrack.controllers;


import com.example.LibTrack.entities.Card;
import com.example.LibTrack.services.CardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/card")
public class CardController {

    private final CardService cardService;

    public CardController(CardService cardService)
    {
        this.cardService = cardService;
    }

    @PostMapping("/search")
    public ResponseEntity SearchCards(@RequestBody String name)
    {
        return cardService.CardFindOrImportByName(name);
    }
}
