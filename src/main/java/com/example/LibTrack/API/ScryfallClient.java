package com.example.LibTrack.API;

import com.example.LibTrack.DTOs.Card.ScryfallCardDTO;
import com.example.LibTrack.DTOs.Card.ScryfallSearchResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;

@Component
public class ScryfallClient {

    private final WebClient webClient;

    public ScryfallClient (WebClient webClient)
    {
        this.webClient = webClient;
    }

    public Mono<ScryfallCardDTO> findByExactName(String name)
    {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                                .path("/cards/named")
                                .queryParam("exact",name)
                                .build()
                        )
                .retrieve()
                .bodyToMono(ScryfallCardDTO.class);
    }

    public List<ScryfallCardDTO> findAllByOracleID(String oracleId)
    {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/cards/search")
                        .queryParam("q", "oracleid:" + oracleId)
                        .build()
                )
                .retrieve()
                .bodyToMono(ScryfallSearchResponse.class)
                .block()
                .getData();
    }

    public List<ScryfallCardDTO> findByName(String name)
    {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/cards/search")
                        .queryParam("q", name)
                        .queryParam("page", 1)
                        .build()
                )
                .retrieve()
                .bodyToMono(ScryfallSearchResponse.class)
                .block()
                .getData();
    }

    public List<ScryfallCardDTO> findByNameLimited(String name) {

        ScryfallSearchResponse response = webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/cards/search")
                        .queryParam("q", name)
                        .build())
                .retrieve()
                .onStatus(
                        status -> status.value() == 404,
                        clientResponse -> Mono.empty()
                )
                .bodyToMono(ScryfallSearchResponse.class)
                .block();

        if (response == null || response.getData() == null) {
            return List.of();
        }

        return response.getData()
                .stream()
                .limit(5)
                .toList();
    }

}
