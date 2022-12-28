package com.ninos.security.service;

import com.ninos.security.dto.AccountResponse;
import com.ninos.security.dto.LoginDTO;
import com.ninos.security.dto.LoginResponse;
import com.ninos.security.dto.RegisterDTO;

public interface AuthService {

    LoginResponse login(LoginDTO loginDTO);
    AccountResponse register(RegisterDTO registerDTO);

}
