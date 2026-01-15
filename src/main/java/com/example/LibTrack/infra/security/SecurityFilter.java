package com.example.LibTrack.infra.security;

import com.example.LibTrack.Repositories.UserRepository;
import com.example.LibTrack.entities.User;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Optional;

@Component
public class SecurityFilter extends OncePerRequestFilter {


    private final TokenService tokenService;

    public SecurityFilter(TokenService tokenService) {
        this.tokenService = tokenService;
    }

    @Autowired
    UserRepository userRepository;



    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        Cookie[] cookies = request.getCookies();

        var token = this.recoverToken(request);

        if(cookies != null) {
            for(Cookie cookie : cookies) {
                if ("access_token".equals(cookie.getName())) {
                    token = cookie.getValue();


                }
            }
        };
                if (token != null) {
                    var login = tokenService.validateToken(token);

                    if (login != null) {
                        UserDetails userDetails = userRepository.findByEmail(login)
                                .orElseThrow(() -> new UsernameNotFoundException("Sua Sessão Expirou!"));

                        var authentication = new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities()
                        );

                        SecurityContextHolder.getContext().setAuthentication(authentication);
                    }
                }


        filterChain.doFilter(request,response);
    }

    private String recoverToken(HttpServletRequest request)
    {
            var authHeader = request.getHeader("Authorization");
            if(authHeader == null) return null;
            return authHeader.replace("Bearer", "").trim();
    }


}




