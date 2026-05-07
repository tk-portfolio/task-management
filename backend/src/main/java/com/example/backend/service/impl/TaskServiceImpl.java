package com.example.backend.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.backend.dto.request.TaskRequest;
import com.example.backend.dto.response.TaskResponse;
import com.example.backend.entity.Task;
import com.example.backend.repository.TaskRepository;
import com.example.backend.service.TaskService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;

    // すべてのタスクを取得
    public List<TaskResponse> getAllTasks(Long userId) {
        List<Task> tasks = taskRepository.findByUserId(userId);
        return tasks.stream()
                .map(TaskResponse::fromEntity)
                .collect(Collectors.toList());
    }

    // タスク追加
    public TaskResponse addTask(TaskRequest taskRequest) {

        Task task = new Task();

        task.setTitle(taskRequest.getTitle());
        task.setDescription(taskRequest.getDescription());
        task.setPriority(taskRequest.getPriority());
        task.setDueDate(taskRequest.getDueDate());
        task.setCategoryId(taskRequest.getCategoryId());
        task.setProgress(taskRequest.getProgress());
        task.setUserId(taskRequest.getUserId());

        Task saved = taskRepository.save(task);

        return TaskResponse.fromEntity(saved);
    }

    // タスク編集
    public TaskResponse editTask(Long id, TaskRequest taskRequest) {

        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("タスクが存在しません"));

        task.setTitle(taskRequest.getTitle());
        task.setDescription(taskRequest.getDescription());
        task.setPriority(taskRequest.getPriority());
        task.setDueDate(taskRequest.getDueDate());
        task.setCategoryId(taskRequest.getCategoryId());
        task.setProgress(taskRequest.getProgress());

        Task saved = taskRepository.save(task);

        return TaskResponse.fromEntity(saved);
    }

    // タスク削除
    public void deleteTask(Long id, Long userId) {

        // 自分のタスクの中にそのタスクがあるか検索
        Optional<Task> taskOpt = taskRepository.findByIdAndUserId(id, userId);

        if (!taskRepository.existsById(id)) {
            throw new RuntimeException("タスクが存在しません");
        }

        if (!taskOpt.isPresent()) {
            throw new RuntimeException("他人のタスクは削除できません");
        }

        taskRepository.deleteById(id);
    }
}
