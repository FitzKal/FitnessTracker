package com.undieb.hu.main.services;

import com.undieb.hu.main.controllers.DTOs.auth.PasswordChangeResponse;
import com.undieb.hu.main.controllers.DTOs.auth.RegisterUserResponse;
import com.undieb.hu.main.controllers.DTOs.auth.VerificationDetails;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Random;

@Service
@Data
public class EmailSenderService {

    @Autowired
    private JavaMailSender mailSender;
    private final String ADMIN_EMAIL = "FitnessTrackerSuppTeam@gmail.com";

    public VerificationDetails sendEmail(String recipientEmail){
        var message = String.format("%05d",new Random().nextInt(10000));
        var messageToSend = setMessageDetails(recipientEmail,message);
        mailSender.send(messageToSend);
        return VerificationDetails.builder().lastOTP(message).otpTime(Instant.now()).build();
    }

    public VerificationDetails sendPasswordResetToken(String recipientEmail){
        var verificationMessage = String.format("%05d",new Random().nextInt(10000));
        var messageToSend = setPasswordResetDetails(recipientEmail,verificationMessage);
        mailSender.send(messageToSend);
        return VerificationDetails.builder().lastOTP(verificationMessage).otpTime(Instant.now()).build();
    }

    public Boolean verifyOtp(String otpToVerify, RegisterUserResponse userResponse){
        return otpToVerify.equals(userResponse.getLastOTP()) && Instant.now()
                .isBefore(userResponse.getOtpTime().plusSeconds(60 * 30));
    }

    public Boolean verifyResetToken(String otpToVerify, PasswordChangeResponse passwordChangeResponse){
        System.out.println(otpToVerify);
        System.out.println(passwordChangeResponse);
        return otpToVerify.equals(passwordChangeResponse.getLastOTP()) && Instant.now()
                .isBefore(passwordChangeResponse.getOtpTime().plusSeconds(60 * 30));
    }


    private SimpleMailMessage setMessageDetails(String recipient, String message){
        var email = new SimpleMailMessage();
        email.setTo(recipient);
        email.setSubject("Fitness Tracker OTP");
        email.setFrom(ADMIN_EMAIL);
        email.setText("Your email verification code : " + message);
        return email;
    }

    private SimpleMailMessage setPasswordResetDetails(String recipient, String message){
        var email = new SimpleMailMessage();
        email.setTo(recipient);
        email.setSubject("Fitness Tracker Password reset Token");
        email.setFrom(ADMIN_EMAIL);
        email.setText("Your password verification token: " + message);
        return email;
    }


}
