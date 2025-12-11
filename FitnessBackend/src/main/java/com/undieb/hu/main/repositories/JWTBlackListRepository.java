package com.undieb.hu.main.repositories;

import com.undieb.hu.main.models.JWTBlackListedTokens;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JWTBlackListRepository extends JpaRepository<JWTBlackListedTokens,String> {
}
