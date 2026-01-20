package com.undieb.hu.main.controllers;

import com.itextpdf.text.DocumentException;
import com.undieb.hu.main.services.PDFService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.URISyntaxException;

@AllArgsConstructor
@RestController
@RequestMapping("/api/fitness/pdf")
public class PDFController {
    private final PDFService pdfService;

    @GetMapping("/{id}")
    public ResponseEntity<byte[]> downloadPDF(@PathVariable Long id) throws DocumentException, IOException, URISyntaxException {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.set(
                HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename=\"UserDetails.pdf\""
        );
        return ResponseEntity.ok()
                .headers(headers)
                .body(pdfService.createPDF(id));
    }
}
