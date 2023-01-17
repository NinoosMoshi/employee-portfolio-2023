package com.ninos.security.controller;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.ninos.security.dto.LoginDTO;
import com.ninos.security.dto.LoginResponse;
import com.ninos.security.dto.TokenDto;
import com.ninos.security.entity.Role;
import com.ninos.security.repository.UserRepository;
import com.ninos.security.service.AuthService;
import com.ninos.security.service.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.social.facebook.api.Facebook;
import org.springframework.social.facebook.api.User;
import org.springframework.social.facebook.api.impl.FacebookTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.io.IOException;
import java.util.Collections;
import java.util.List;



@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/social")
public class SocialController {

    private final UserRepository userRepository;
    private final RoleService roleService;
    private final AuthService authService;
    private final PasswordEncoder passwordEncoder;

    @Value("google.id")
    private String idClient;

    @Value("mySecret.password")
    private String privatePassword;


    @PostMapping("/google")
    public LoginResponse loginWithGoogle(@RequestBody TokenDto tokenDto) throws IOException {
        NetHttpTransport transport = new NetHttpTransport();
        JacksonFactory factory = JacksonFactory.getDefaultInstance();
        GoogleIdTokenVerifier.Builder ver =
                new GoogleIdTokenVerifier.Builder(transport,factory)
                        .setAudience(Collections.singleton(idClient));
        GoogleIdToken googleIdToken = GoogleIdToken.parse(ver.getJsonFactory(),tokenDto.getToken());
        GoogleIdToken.Payload payload = googleIdToken.getPayload();

//        boolean result = userRepository.existsByEmail(payload.getEmail());
//        LoginResponse loginResponse;
//        if (!result){
//            com.ninos.security.entity.User userModel = new com.ninos.security.entity.User();
//            userModel.setUsername(payload.getIssuer());
//
//            userModel.setEmail(payload.getEmail());
//            userModel.setPassword(passwordEncoder.encode(privatePassword));
//            userModel.setActive(1);
//
//            List<Role> allRoles = roleService.getAllRoles();
//            userModel.getRoles().add(allRoles.get(1));
//            userRepository.save(userModel);
//        }
//        LoginDTO loginDTO = new LoginDTO();
//        loginDTO.setUsernameOrEmail(payload.getEmail());
//        loginDTO.setPassword(privatePassword);
//        loginResponse = authService.login(loginDTO);
//
//        return loginResponse;

        return loginSocial(payload.getEmail());
    }




    private LoginResponse loginSocial(String email){
        boolean result = userRepository.existsByEmail(email);
        if (!result){
            com.ninos.security.entity.User userModel = new com.ninos.security.entity.User();
            userModel.setUsername("social");

            userModel.setEmail(email);
            userModel.setPassword(passwordEncoder.encode(privatePassword));
            userModel.setActive(1);

            List<Role> allRoles = roleService.getAllRoles();
            userModel.getRoles().add(allRoles.get(1));
            userRepository.save(userModel);
        }
        LoginDTO loginDTO = new LoginDTO();
        loginDTO.setUsernameOrEmail(email);
        loginDTO.setPassword(privatePassword);
        return authService.login(loginDTO);

    }






}
