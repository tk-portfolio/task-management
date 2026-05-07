package com.example.backend.dto.response;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.example.backend.entity.Task;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TaskResponse {

    private Long id;

    private String title;

    private String description;

    private Integer priority;

    private LocalDate dueDate;

    private Long categoryId;

    private Boolean deleted;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private Integer progress;

    private Long userId;

    public static TaskResponse fromEntity(Task task) {
        return new TaskResponse(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.getPriority(),
                task.getDueDate(),
                task.getCategoryId(),
                task.getDeleted(),
                task.getCreatedAt(),
                task.getUpdatedAt(),
                task.getProgress(),
                task.getUserId());
    }
}
