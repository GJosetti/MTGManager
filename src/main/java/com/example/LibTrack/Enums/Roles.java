package com.example.LibTrack.Enums;

import java.security.PublicKey;

public enum Roles {

    ADMIN(0),
    FUNCIONARIO(1),
    USER(2);

    private int role;

    Roles(int role){
        this.role = role;
    }

    public int getRole() {
        return role;
    }
}


