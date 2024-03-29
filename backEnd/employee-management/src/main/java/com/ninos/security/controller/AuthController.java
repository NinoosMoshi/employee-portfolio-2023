package com.ninos.security.controller;

import com.ninos.mail.Email;
import com.ninos.mail.EmailService;
import com.ninos.security.dto.*;
import com.ninos.security.entity.User;
import com.ninos.security.repository.UserRepository;
import com.ninos.security.service.AuthService;
import com.ninos.security.service.CustomUserDetailsService;
import com.ninos.util.RandomCode;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;
    private final CustomUserDetailsService userService;
    private final UserRepository userRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;


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


    //http://localhost:8080/active
    @PostMapping("/active")
    public UserActive getActiveUser(@RequestBody LoginDTO loginDTO){
        return authService.userActive(loginDTO);
    }



    @PostMapping("/activated")
    public AccountResponse activeAccount(@RequestBody ActiveAccount activeAccount){
        User user = userService.gerUserByUsernameOrEmail(activeAccount.getUsernameOrEmail(), activeAccount.getUsernameOrEmail());
        AccountResponse accountResponse = new AccountResponse();
        if (user.getCode().getCode().equals(activeAccount.getCode())){
           user.setActive(1);
           userRepository.save(user);
           accountResponse.setResult(1);
        } else {
           accountResponse.setResult(0);
        }

        return accountResponse;

    }


    @PostMapping("/check-email")
    public AccountResponse resetPasswordEmail(@RequestBody ResetPassword resetPassword){

        User user = userRepository.findByEmail(resetPassword.getEmail());
        AccountResponse accountResponse = new AccountResponse();
        if (user != null){
            String newCode = RandomCode.generateCode();
            Email email = new Email(resetPassword.getEmail(), newCode);
            emailService.sendCodeByMail(email);
            user.getCode().setCode(newCode);
            userRepository.save(user);
            accountResponse.setResult(1);
        }else {
            accountResponse.setResult(0);
        }

        return accountResponse;
    }



    @PostMapping("/reset-password")
    public AccountResponse resetPassword(@RequestBody NewPassword newPassword){
        User user = userRepository.findByEmail(newPassword.getEmail());
        AccountResponse accountResponse = new AccountResponse();
        if (user != null){
           if (user.getCode().getCode().equals(newPassword.getCode())){
              user.setPassword(passwordEncoder.encode(newPassword.getPassword()));
               userRepository.save(user);
               accountResponse.setResult(1);
           }else {
               accountResponse.setResult(0);
           }
        }
        else {
              accountResponse.setResult(0);
        }

        return accountResponse;

    }







}
