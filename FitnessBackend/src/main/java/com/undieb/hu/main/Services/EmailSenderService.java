package com.undieb.hu.main.Services;

import com.undieb.hu.main.Controllers.DTOs.RegisterUserResponse;
import com.undieb.hu.main.Controllers.DTOs.VerificationDetails;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDate;
import java.util.Date;
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

    public Boolean verifyOtp(String otpToVerify, RegisterUserResponse userResponse){
        System.out.println(otpToVerify);
        System.out.println(userResponse);
        return otpToVerify.equals(userResponse.getLastOTP()) && Instant.now()
                .isBefore(userResponse.getOtpTime().plusSeconds(60 * 30));
    }

    private SimpleMailMessage setMessageDetails(String recipient, String message){
        var email = new SimpleMailMessage();
        email.setTo(recipient);
        email.setSubject("Fitness Tracker OTP");
        email.setFrom(ADMIN_EMAIL);
        email.setText("Your email verification code : " + message);
        return email;
    }


}
