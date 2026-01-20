package com.undieb.hu.main.services;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfWriter;
import com.undieb.hu.main.exceptions.ProfileNotFoundException;
import com.undieb.hu.main.models.MonthlyGoal;
import com.undieb.hu.main.models.UserProfile;
import com.undieb.hu.main.models.WeeklyGoal;
import com.undieb.hu.main.repositories.UserProfileRepository;
import lombok.AllArgsConstructor;
import org.springframework.core.convert.ConversionService;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.URISyntaxException;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;


@Service
@AllArgsConstructor
public class PDFService {
    private final UserProfileRepository userProfileRepository;

    public byte[] createPDF(Long id) throws IOException, DocumentException, URISyntaxException {
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        Document document = new Document();
        PdfWriter.getInstance(document, out);
        Font font = FontFactory.getFont(FontFactory.COURIER, 16, BaseColor.BLACK);

        var profile = getUserProfile(id);
        var username = profile.getUser().getUsername();
        document.open();

        Paragraph usernamePara = new Paragraph("Your username: " + username, font);
        usernamePara.setSpacingAfter(10f);
        Paragraph userIdPara = new Paragraph("Your userId: " + profile.getUser().getId(), font);
        userIdPara.setSpacingAfter(10f);
        Paragraph emailPara = new Paragraph("Your email: " + profile.getUser().getEmail(), font);
        Paragraph monthlyGoalNumberPara = new Paragraph(
                "The number of Monthly goals recorded: " + profile.getMonthlyGoals().size(),font);
        Paragraph weeklyGoalNumberPara = new Paragraph(
                "The number of Weekly goals recorded: " + getNumberOfWeeklyGoals(profile.getMonthlyGoals()),font);
        Paragraph dailyGoalNumberPara = new Paragraph(
                "The number of Daily goals recorded: " + getNumberOfDailyGoals(profile.getMonthlyGoals()),font);
        Image image = Image.getInstance(profile.getProfilePictureSrc());
        dailyGoalNumberPara.setSpacingAfter(10f);
        image.scaleToFit(400, 400);
        image.setAlignment(Image.ALIGN_CENTER);
        image.setRotationDegrees(270);



        document.add(usernamePara);
        document.add(userIdPara);
        document.add(emailPara);
        document.add(monthlyGoalNumberPara);
        document.add(weeklyGoalNumberPara);
        document.add(dailyGoalNumberPara);
        document.add(image);
        document.close();
        return out.toByteArray();
    }

    private UserProfile getUserProfile(Long id){
        return userProfileRepository.findById(id)
                .orElseThrow(()->new ProfileNotFoundException("There is no profile with that id"));
    }

    private int getNumberOfWeeklyGoals(List<MonthlyGoal> list){
        int weeklyGoalNumber = 0;
        for (var goal : list){
            weeklyGoalNumber += goal.getWeeklyGoals().size();
        }
        return weeklyGoalNumber;
    }


    private int getNumberOfDailyGoals(List<MonthlyGoal> list){
        int dailyGoalNumber = 0;
        for (var goal : list){
            var nr = goal.getWeeklyGoals().stream()
                    .mapToInt(weeklyGoal -> weeklyGoal.getDailyGoals().size())
                    .sum();
            dailyGoalNumber += nr;
        }
        return dailyGoalNumber;
    }
}
