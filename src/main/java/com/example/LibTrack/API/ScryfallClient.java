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

    public List<ScryfallCardDTO> findByName(String name)
    {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/cards/search")
                        .queryParam("q", name)
                        .build()
                )
                .retrieve()
                .bodyToMono(ScryfallSearchResponse.class)
                .block()
                .getData();
    }


}
