package com.example.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.request.TaskRequest;
import com.example.backend.dto.response.TaskResponse;
import com.example.backend.service.TaskService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/task")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    // タスク表示
    @GetMapping("/search")
    public ResponseEntity<List<TaskResponse>> getAllTasks() {

        String userIdStr = SecurityContextHolder.getContext().getAuthentication().getName();
        Long userId = Long.parseLong(userIdStr);

        List<TaskResponse> tasks = taskService.getAllTasks(userId);
        return ResponseEntity.ok(tasks);
    }

    // タスク追加
    @PostMapping("/add")
    public ResponseEntity<TaskResponse> addTask(@RequestBody TaskRequest taskRequest) {
        String userIdStr = SecurityContextHolder.getContext().getAuthentication().getName();
        Long userId = Long.parseLong(userIdStr);

        // トークンからuserIdを取得してセット
        taskRequest.setUserId(userId);

        TaskResponse response = taskService.addTask(taskRequest);
        return ResponseEntity.ok(response);
    }

    // タスク編集
    @PutMapping("/{id}")
    public ResponseEntity<TaskResponse> editTask(@RequestBody TaskRequest taskRequest,
            @PathVariable Long id) {

        String userIdStr = SecurityContextHolder.getContext().getAuthentication().getName();
        Long userId = Long.parseLong(userIdStr);

        // トークンからuserIdを取得してセット
        taskRequest.setUserId(userId);

        TaskResponse response = taskService.editTask(id, taskRequest);
        return ResponseEntity.ok(response);
    }

    // タスク削除
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable Long id) {
        String userIdStr = SecurityContextHolder.getContext().getAuthentication().getName();
        Long userId = Long.parseLong(userIdStr);

        taskService.deleteTask(id, userId);
        return ResponseEntity.ok().build();
    }

}
