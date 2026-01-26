package com.example.LibTrack.API;

import com.example.LibTrack.DTOs.Card.ScryfallCardDTO;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

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


}
