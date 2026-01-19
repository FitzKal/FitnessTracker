package com.undieb.hu.main.repositories;

import com.undieb.hu.main.models.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<Users,Long> {
    Users findByUsername(String username);
    Boolean existsByEmail(String email);
    Users findByEmail(String email);
    Boolean existsByUsername(String username);
}
