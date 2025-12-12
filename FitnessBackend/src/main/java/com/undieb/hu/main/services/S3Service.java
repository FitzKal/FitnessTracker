package com.undieb.hu.main.services;

import com.undieb.hu.main.controllers.DTOs.user.UserImg;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;

@Service
public class S3Service {
    @Autowired
    private S3Client s3Client;

    @Value("${aws.bucket.name}")
    private String bucketName;

    public UserImg uploadFile(MultipartFile file) throws IOException {
        s3Client.putObject(PutObjectRequest.builder()
                        .bucket(bucketName)
                        .key(file.getOriginalFilename())
                .build(),
                RequestBody.fromBytes(file.getBytes()));
        var key = file.getOriginalFilename();
        var url = s3Client.utilities()
                .getUrl(builder ->  builder.bucket(bucketName).key(key)).toExternalForm();
        return new UserImg(url,key);
    }
    public void deleteFile(String key){
        s3Client.deleteObject(DeleteObjectRequest.builder()
                .key(key)
                .bucket(bucketName)
                .build());
    }
}

