package com.undieb.hu.main.Repositories;

import com.undieb.hu.main.Models.JWTBlackListedTokens;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JWTBlackListRepository extends JpaRepository<JWTBlackListedTokens,String> {
}
