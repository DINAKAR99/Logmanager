package com.example.demo.dto;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-generate ID
    private Long id;

    private String projectCode;
    private String moduleId; // Added moduleId field
    private String memberId;
    private String taskId;
    private LocalDate fromDate;
    private LocalDate toDate;
    private LocalDate taskAssigned = LocalDate.now();
    private LocalDate actualStartDate;
    private LocalDate actualEndDate;
    private String subtaskId = "0"; // Default value for subtaskId
    private String subtaskDesc = ""; // Field to hold the subtask description
    private String description; // Task description

    // New fields
    private String plannedHours; // Planned hours in "X hours Y minutes" format
    private String actualHours; // Actual hours in "X hours Y minutes" format
    private String category; // Task category (e.g., "Development", "Testing")
    private String priority; // Task priority (e.g., "Low", "Medium", "High")
    private String complexity; // Task complexity (e.g., "Low", "Medium", "High")
    private String status; // Task status (e.g., "Open", "In Progress", "Completed")

    // Getters and Setters for the new fields
    public String getSubtaskDesc() {
        return subtaskDesc;
    }

    public void setSubtaskDesc(String subtaskDesc) {
        this.subtaskDesc = subtaskDesc;
    }

    public String getPlannedHours() {
        return plannedHours;
    }

    public void setPlannedHours(String plannedHours) {
        this.plannedHours = plannedHours;
    }

    public String getActualHours() {
        return actualHours;
    }

    public void setActualHours(String actualHours) {
        this.actualHours = actualHours;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public String getComplexity() {
        return complexity;
    }

    public void setComplexity(String complexity) {
        this.complexity = complexity;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getModuleId() {
        return moduleId;
    }

    public void setModuleId(String moduleId) {
        this.moduleId = moduleId;
    }

    // Getters and Setters for the existing fields
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProjectCode() {
        return projectCode;
    }

    public void setProjectCode(String projectCode) {
        this.projectCode = projectCode;
    }

    public String getMemberId() {
        return memberId;
    }

    public void setMemberId(String memberId) {
        this.memberId = memberId;
    }

    public String getTaskId() {
        return taskId;
    }

    public void setTaskId(String taskId) {
        this.taskId = taskId;
    }

    public LocalDate getFromDate() {
        return fromDate;
    }

    public void setFromDate(LocalDate fromDate) {
        this.fromDate = fromDate;
    }

    public LocalDate getToDate() {
        return toDate;
    }

    public void setToDate(LocalDate toDate) {
        this.toDate = toDate;
    }

    public String getSubtaskId() {
        return subtaskId;
    }

    public void setSubtaskId(String subtaskId) {
        this.subtaskId = subtaskId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getTaskAssigned() {
        return taskAssigned;
    }

    public void setTaskAssigned(LocalDate taskAssigned) {
        this.taskAssigned = taskAssigned;
    }

    public LocalDate getActualStartDate() {
        return actualStartDate;
    }

    public void setActualStartDate(LocalDate actualStartDate) {
        this.actualStartDate = actualStartDate;
    }

    public LocalDate getActualEndDate() {
        return actualEndDate;
    }

    public void setActualEndDate(LocalDate actualEndDate) {
        this.actualEndDate = actualEndDate;
    }

}
