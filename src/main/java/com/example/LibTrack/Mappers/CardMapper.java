package com.example.LibTrack.Mappers;

import com.example.LibTrack.DTOs.Card.SaveCardDTO;
import com.example.LibTrack.DTOs.Card.ScryfallCardDTO;
import com.example.LibTrack.entities.Card;

import java.util.HashSet;

public class CardMapper {

    public static Card fromDTO(ScryfallCardDTO dto) {
        Card card = new Card();
        card.setName(dto.getName());
        card.setManaCost(dto.getManaCost());
        card.setOracleText(dto.getOracleText());
        card.setOracleID(dto.getOracleId());
        card.setTypeLine(dto.getTypeLine());
        card.setRarity(dto.getRarity());
        card.setSet(dto.getSet());
        card.setCollectorNumber(dto.getCollectorNumber());

        if (dto.getImageUris() != null) {
            card.setImageUrl(dto.getImageUris().get("normal"));
        }

        return card;
    }


    public static Card fromSaveDTO(SaveCardDTO dto)
    {
        Card card = new Card();
        card.setName(dto.getName());
        card.setManaCost(dto.getManaCost());
        card.setOracleText(dto.getOracleText());
        card.setOracleID(dto.getOracleId());
        card.setTypeLine(dto.getTypeLine());
        card.setRarity(dto.getRarity());
        card.setSet(dto.getSet());
        card.setCollectorNumber(dto.getCollectorNumber());

        if (dto.getImageUrl() != null) {
            card.setImageUrl(dto.getImageUrl());
        }

        return card;
    }

    public void defaultMapping()
    {

    }

}
