package com.ninos.security.controller;

import com.ninos.security.dto.AccountResponse;
import com.ninos.security.dto.LoginDTO;
import com.ninos.security.dto.LoginResponse;
import com.ninos.security.dto.RegisterDTO;
import com.ninos.security.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;


    // build Login API
    @PostMapping(value = {"/login", "/sign-in"})
    public LoginResponse login(@RequestBody LoginDTO loginDTO){
        return authService.login(loginDTO);
    }


    // build Registration API
    @PostMapping(value = {"/register", "/sign-up"})
    public ResponseEntity<AccountResponse> register(@RequestBody RegisterDTO registerDTO){
        AccountResponse register = authService.register(registerDTO);
        return new ResponseEntity<>(register, HttpStatus.CREATED);
    }



}
