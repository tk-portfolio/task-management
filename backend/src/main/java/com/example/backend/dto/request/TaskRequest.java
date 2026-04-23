package com.example.backend.dto.request;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskRequest {

    private String title;

    private String description;

    private Integer priority;

    private LocalDate dueDate;

    private Long categoryId;

    private Boolean deleted;

    private Integer progress;
}
