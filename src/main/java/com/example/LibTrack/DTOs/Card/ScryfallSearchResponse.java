package com.example.LibTrack.DTOs.Card;

import lombok.Data;

import java.util.List;

@Data
public class ScryfallSearchResponse {
    private List<ScryfallCardDTO> data;
    private boolean has_more;
    private String next_page;

}
