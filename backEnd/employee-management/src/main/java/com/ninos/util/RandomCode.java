package com.ninos.util;

import org.apache.commons.lang3.RandomStringUtils;

public class RandomCode {

    public static String generateCode(){
        return RandomStringUtils.randomAlphabetic(5).toUpperCase();

    }

}

