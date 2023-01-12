package com.ninos.security.service;

import com.ninos.security.dto.AccountResponse;
import com.ninos.security.dto.ActiveAccount;
import com.ninos.security.dto.UserPrincipal;
import com.ninos.security.entity.User;
import com.ninos.security.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@RequiredArgsConstructor
@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;


    @Override
    public UserDetails loadUserByUsername(String usernameOrEmail) throws UsernameNotFoundException {

        User user = userRepository.findByUsernameOrEmail(usernameOrEmail, usernameOrEmail)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with user or email: " + usernameOrEmail));

        UserPrincipal userPrincipal = new UserPrincipal(user);

        return userPrincipal;
    }


      public User gerUserByUsernameOrEmail(String username, String email){
        return userRepository.findByUsernameOrEmail(username,email).get();
      }


}




