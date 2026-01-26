package com.example.LibTrack.API;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {

    @Bean
    public WebClient scryfallWebClient(){
        return WebClient.builder()
                .baseUrl("")
                .defaultHeader(HttpHeaders.USER_AGENT,"MTGManager")
                .build();

    }
}
