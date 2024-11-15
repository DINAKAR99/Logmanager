package com.example.demo.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.dto.Task;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    @Query("SELECT t FROM Task t WHERE t.memberId = :memberId AND t.fromDate = :currentDate")
    List<Task> findTasksForToday(@Param("memberId") String memberId, @Param("currentDate") LocalDate currentDate);

    @Query("SELECT t FROM Task t WHERE t.fromDate >= :fromDate AND t.fromDate <= :toDate AND t.memberId = :memberId ORDER BY  t.fromDate ASC")
    List<Task> findTasksByDateRange(@Param("memberId") String memberId, @Param("fromDate") LocalDate fromDate,
            @Param("toDate") LocalDate toDate);

    @Query("SELECT t FROM Task t WHERE t.fromDate >= :fromDate AND t.fromDate <= :toDate  ORDER BY t.memberId ASC,t.taskId ASC,t.subtaskId ASC,t.fromDate ASC")
    List<Task> findTasksByDateRangeAll(@Param("fromDate") LocalDate fromDate,
            @Param("toDate") LocalDate toDate);

    @Query("SELECT COUNT(t) FROM Task t WHERE t.projectCode = :projectCode")
    Long countTasksByProjectCode(@Param("projectCode") String projectCode);

 

}
