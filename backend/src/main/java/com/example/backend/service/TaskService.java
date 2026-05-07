package com.example.backend.service;

import java.util.List;

import com.example.backend.dto.request.TaskRequest;
import com.example.backend.dto.response.TaskResponse;

public interface TaskService {

    List<TaskResponse> getAllTasks(Long userId);

    TaskResponse addTask(TaskRequest taskRequest);

    TaskResponse editTask(Long id, TaskRequest taskRequest);

    void deleteTask(Long id, Long userId);
}
