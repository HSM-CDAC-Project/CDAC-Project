package com.jobdone.notifiertemplate;

import java.security.SecureRandom;

public class OtpGenerator {
	
	private static final int OTP_LENGTH = 6; // Define OTP length	

    public String getRandomNumber() {
        SecureRandom random = new SecureRandom();
        int otp = random.nextInt((int) Math.pow(10, OTP_LENGTH));
        return String.format("%0" + OTP_LENGTH + "d", otp);
    }
}
