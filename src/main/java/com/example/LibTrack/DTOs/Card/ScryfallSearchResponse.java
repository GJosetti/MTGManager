package com.example.LibTrack.DTOs.Card;

import lombok.Data;

import java.util.List;

@Data
public class ScryfallSearchResponse {
    private List<ScryfallCardDTO> data;

}
