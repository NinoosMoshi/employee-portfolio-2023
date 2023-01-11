package com.ninos.security.dto;

import lombok.Data;

@Data
public class ActiveAccount {

    private String email;
    private String code;

    private String usernameOrEmail;


}
