package com.ninos.security.repository;

import com.ninos.security.entity.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsernameOrEmail(String username, String email);
    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);

//    @Query("select u.active from User u where u.email=?1")
//    int getActive(String email);

    @Transactional
    @Query("select u.active from User u where u.username=?1 or u.email=?2")
    int getActiveByUsernameOrEmail(String username,String email);

    @Transactional
    @Query("select u.password from User u where u.username=?1 or u.email=?2")
    String getPasswordByUsernameOrEmail(String username,String email);





}
