package com.undieb.hu.main.Services;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Random;

@Service
@Data
@AllArgsConstructor
public class EmailSenderService {

    private JavaMailSender mailSender;
    private final String ADMIN_EMAIL = "FitnessTrackerSuppTeam@gmail.com";
    private String lastOTP;
    private Instant otpTime;

    public SimpleMailMessage sendEmail(String recipientEmail){
        var message = String.format("%05d",new Random().nextInt(10000));
        this.lastOTP = message;
        var messageToSend = new SimpleMailMessage();
        messageToSend.setTo(recipientEmail);
        messageToSend.setSubject("Fitness Tracker OTP");
        messageToSend.setFrom(ADMIN_EMAIL);
        return messageToSend;
    }


}
