package com.undieb.hu.main.repositories;

import com.undieb.hu.main.models.MonthlyGoal;
import com.undieb.hu.main.models.enums.DailyGoal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DailyGoalRepository extends JpaRepository<DailyGoal, Long> {
}
