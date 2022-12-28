package com.ninos.security.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class RegisterDTO {

    private String name;
    private String username;
    private String email;
    private String password;


}
