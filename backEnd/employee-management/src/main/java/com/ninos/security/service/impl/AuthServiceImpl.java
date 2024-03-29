package com.ninos.security.service.impl;

import com.ninos.mail.Email;
import com.ninos.mail.EmailService;
import com.ninos.security.dto.*;
import com.ninos.security.entity.Code;
import com.ninos.security.entity.Role;
import com.ninos.security.entity.User;
import com.ninos.security.exception.EmployeeAPIException;
import com.ninos.security.jwt.JwtTokenProvider;
import com.ninos.security.repository.UserRepository;
import com.ninos.security.service.AuthService;
import com.ninos.security.service.CustomUserDetailsService;
import com.ninos.security.service.RoleService;
import com.ninos.util.RandomCode;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;


@RequiredArgsConstructor
@Service
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final RoleService roleService;
    private final EmailService emailService;



    @Override
    public LoginResponse login(LoginDTO loginDTO) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDTO.getUsernameOrEmail(), loginDTO.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);


        User user = userRepository.findByUsernameOrEmail(loginDTO.getUsernameOrEmail(),loginDTO.getUsernameOrEmail()).get();

        List<Role> roles = getRoleList(user);

        String token = jwtTokenProvider.generateToken(authentication);

        return new LoginResponse(user.getEmail(), token, roles);
    }


    @Override
    public UserActive userActive(LoginDTO loginDTO) {
        String enPassword = userRepository.getPasswordByUsernameOrEmail(loginDTO.getUsernameOrEmail(), loginDTO.getUsernameOrEmail());  // get password this email from mysql
        boolean result = passwordEncoder.matches(loginDTO.getPassword(),enPassword); // match password that user entered with password in mysql
        UserActive userActive = new UserActive();
        if (result){
            int act = userRepository.getActiveByUsernameOrEmail(loginDTO.getUsernameOrEmail(), loginDTO.getUsernameOrEmail());
            if(act == 0){
               String myCode = RandomCode.generateCode();

               Email mail = new Email(loginDTO.getUsernameOrEmail(), myCode);
               emailService.sendCodeByMail(mail);

               User user = userRepository.findByUsernameOrEmail(loginDTO.getUsernameOrEmail(), loginDTO.getUsernameOrEmail()).get();
               user.getCode().setCode(myCode);
               userRepository.save(user);
            }
            userActive.setActive(act);
        }else{
            userActive.setActive(-1);
        }
        return userActive;
    }




    private List<Role> getRoleList(User user){
        List<Role> roleList = new ArrayList<>();
        for(int i=0; i< user.getRoles().size(); i++) {
            Role roleModel = new Role();
            roleModel.setName(user.getRoles().get(i).getName());
            roleList.add(roleModel);
        }
        return roleList;
    }



    @Override
    public AccountResponse register(RegisterDTO registerDTO) {

        AccountResponse accountResponse = new AccountResponse();

        // check username is exists in database
        if (userRepository.existsByUsername(registerDTO.getUsername())){
            accountResponse.setResult(0);
            throw new EmployeeAPIException(HttpStatus.BAD_REQUEST, "Username is already exists!");
        }
        // check email is exists in database
        if (userRepository.existsByEmail(registerDTO.getEmail())){
            accountResponse.setResult(0);
            throw new EmployeeAPIException(HttpStatus.BAD_REQUEST, "Email is already exists!");
        }

        String myCode = RandomCode.generateCode();
        User user = new User();
        user.setName(registerDTO.getName());
        user.setUsername(registerDTO.getUsername());
        user.setEmail(registerDTO.getEmail());
        user.setPassword(passwordEncoder.encode(registerDTO.getPassword()));
        user.setActive(0);
        user.getRoles().add(roleService.getAllRoles().get(1));

        Email mail = new Email(registerDTO.getEmail(), myCode);
        emailService.sendCodeByMail(mail);
        Code code = new Code();
        code.setCode(myCode);
        user.setCode(code);
        userRepository.save(user);
        accountResponse.setResult(1);

        return accountResponse;
    }









}
