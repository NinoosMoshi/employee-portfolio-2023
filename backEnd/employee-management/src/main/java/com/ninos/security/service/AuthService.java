package com.ninos.security.service;

import com.ninos.security.dto.*;


public interface AuthService {

    LoginResponse login(LoginDTO loginDTO);
    AccountResponse register(RegisterDTO registerDTO);

    UserActive userActive(LoginDTO loginDTO);




}
