package com.undieb.hu.main.Services;

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
    private String lastOTP;
    private Instant otpTime;

    public String sendEmail(String recipientEmail){
        var message = String.format("%05d",new Random().nextInt(10000));
        this.lastOTP = message;
        this.otpTime = Instant.now();
        var messageToSend = setMessageDetails(recipientEmail,message);
        mailSender.send(messageToSend);
        return message;
    }

    public Boolean verifyOtp(String otpToVerify){
        return otpToVerify.equals(lastOTP) && Instant.now().isBefore(otpTime.plusSeconds(60 * 30));
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
