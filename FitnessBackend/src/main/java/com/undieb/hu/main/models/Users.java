package com.undieb.hu.main.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.undieb.hu.main.controllers.DTOs.user.UserProfileDto;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.proxy.HibernateProxy;

import java.util.Objects;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(nullable = false, unique = true)
    private String username;
    private String password;
    @Enumerated(EnumType.STRING)
    private Role role;
    @Column(nullable = false, unique = true)
    private String email;

    @OneToOne(mappedBy = "user",cascade = CascadeType.ALL)
    @JsonManagedReference
    private UserProfile userProfile;

    @Override
    public final boolean equals(Object o) {
        if (this == o) return true;
        if (o == null) return false;
        Class<?> oEffectiveClass = o instanceof HibernateProxy ? ((HibernateProxy) o).getHibernateLazyInitializer().getPersistentClass() : o.getClass();
        Class<?> thisEffectiveClass = this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass() : this.getClass();
        if (thisEffectiveClass != oEffectiveClass) return false;
        Users users = (Users) o;
        return getId() != null && Objects.equals(getId(), users.getId());
    }

    @Override
    public final int hashCode() {
        return this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass().hashCode() : getClass().hashCode();
    }

    public void setProfile(UserProfile userProfile){
        this.setUserProfile(userProfile);
        userProfile.setUser(this);
    }
}
