package com.example.demo.controller;

import java.time.LocalDate;
import java.util.List; // For List

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.DateRangeRequest;
import com.example.demo.dto.Task;
import com.example.demo.dto.TaskRequest;
import com.example.demo.repository.TaskRepository;
import com.example.demo.services.TaskService;

@RestController
@RequestMapping("/protected/api")
public class TaskController {

    private final TaskService taskService;
    @Autowired
    private TaskRepository taskRepository;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping("/tasks")
    public ResponseEntity<String> saveTasks(@RequestBody TaskRequest request) {
        List<Task> tasks = request.getTasks();

        // Save tasks to the database
        taskService.saveAllTasks(tasks);

        return ResponseEntity.ok("Tasks received and saved successfully!");
    }

    @PostMapping("/tasks/today")
    public ResponseEntity<List<Task>> getTodayTasksForLoggedInUser(@RequestParam("empid") String empid) {
        // Fetch tasks for the logged-in user
        List<Task> tasks = taskRepository.findTasksForToday(empid, LocalDate.now());
        return ResponseEntity.ok(tasks);
    }

    @PostMapping("/tasks/range")
    public ResponseEntity<List<Task>> getTasksByDateRange(@RequestBody DateRangeRequest request) {
        LocalDate fromDate = request.getFromDate();
        LocalDate toDate = request.getToDate(); 
        System.out.println(request.getEmpid() + "0-------------------");
        List<Task> tasks = taskService.findTasksByDateRange(request.getEmpid(), fromDate, toDate);

        return ResponseEntity.ok(tasks);
    }

    @PostMapping("/tasks/range/all")
    public ResponseEntity<List<Task>> getTasksByDateRangeAll(@RequestBody DateRangeRequest request) {
        LocalDate fromDate = request.getFromDate();
        LocalDate toDate = request.getToDate();
        List<Task> tasks = taskService.findTasksByDateRangeAll(fromDate, toDate);
        return ResponseEntity.ok(tasks);
    }

    // Endpoint to get the task count by projectCode

    @GetMapping("/tasks/count")
    public ResponseEntity<Long> getTaskCountByProjectCode(@RequestParam String projectCode) {
        Long taskCount = taskService.getTaskCountByProjectCode(projectCode);
        if (taskCount != null) {
            return ResponseEntity.ok(taskCount); // Return task count with HTTP 200
        } else {
            return ResponseEntity.notFound().build(); // Return HTTP 404 if not found
        }
    }
}
