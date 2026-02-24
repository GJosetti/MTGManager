package com.example.LibTrack.Enums;

import java.security.PublicKey;

public enum Roles {

    ADMIN(0),
    USER(1),
    FUNCIONARIO(2);

    private int role;

    Roles(int role){
        this.role = role;
    }

    public int getRole() {
        return role;
    }
}


