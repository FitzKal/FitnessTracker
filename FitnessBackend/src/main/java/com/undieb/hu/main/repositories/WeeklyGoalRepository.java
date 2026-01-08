package com.undieb.hu.main.repositories;

import com.undieb.hu.main.models.MonthlyGoal;
import com.undieb.hu.main.models.WeeklyGoal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WeeklyGoalRepository extends JpaRepository<WeeklyGoal, Long> {
}
