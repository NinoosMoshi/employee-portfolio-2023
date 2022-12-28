package com.ninos.security.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class EmployeeAPIException extends RuntimeException{

    private HttpStatus status;
    private String message;

}
