package com.example.LibTrack.DTOs.Card;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ScryfallCardDTO {

    private String id;
    private String name;

    @JsonProperty("mana_cost")
    private String manaCost;

    @JsonProperty("oracle_text")
    private String oracleText;

    @JsonProperty("type_line")
    private String typeLine;

    private List<String> colors;
    private String rarity;
    private String set;

    @JsonProperty("collector_number")
    private String collectorNumber;

    @JsonProperty("image_uris")
    private Map<String, String> imageUris;

    private PricesDTO prices;

}
