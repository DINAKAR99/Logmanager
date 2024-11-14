package com.example.demo.dto;

import java.util.List;

public class TaskRequest {
    private List<Task> tasks;

    public List<Task> getTasks() {
        return tasks;
    }

    public void setTasks(List<Task> tasks) {
        this.tasks = tasks;
    }

    @Override
    public String toString() {
        return "TaskRequest{" +
                "tasks=" + tasks +
                '}';
    }
}
