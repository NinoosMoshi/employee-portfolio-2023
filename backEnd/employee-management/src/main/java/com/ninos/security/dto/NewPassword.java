package com.ninos.security.dto;

import lombok.Data;

@Data
public class NewPassword {

    private String email;
    private String code;
    private String password;

}
