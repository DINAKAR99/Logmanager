package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.Task;
import com.example.demo.repository.TaskRepository;

import java.time.LocalDate;
import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    @Autowired
    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<Task> saveAllTasks(List<Task> tasks) {
        return taskRepository.saveAll(tasks);
    }

    public List<Task> getTasksForToday(String memberId) {
        return taskRepository.findTasksForToday(memberId, LocalDate.now());
    }

    public List<Task> findTasksByDateRange(String memberId, LocalDate fromDate, LocalDate toDate) {
        return taskRepository.findTasksByDateRange(memberId, fromDate, toDate);
    }

    public List<Task> findTasksByDateRangeAll(LocalDate fromDate, LocalDate toDate) {
        return taskRepository.findTasksByDateRangeAll(fromDate, toDate);
    }

    public Long getTaskCountByProjectCode(String projectCode) {
        return taskRepository.countTasksByProjectCode(projectCode);
    }

}
