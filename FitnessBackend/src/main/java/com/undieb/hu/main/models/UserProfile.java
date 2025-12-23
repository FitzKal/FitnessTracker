package com.undieb.hu.main.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.undieb.hu.main.models.enums.Gender;
import jakarta.persistence.*;
import lombok.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class UserProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long profileId;
    private String profilePictureName;
    private String profilePictureSrc;
    private String firstName;
    private String lastName;
    private Double weight;
    private Double height;
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @JsonBackReference
    private Users user;
}
