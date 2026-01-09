package com.undieb.hu.main.repositories;

import com.undieb.hu.main.models.MonthlyGoal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MonthlyGoalRepository extends JpaRepository<MonthlyGoal, Long> {
    boolean existsById(Long id);
}
