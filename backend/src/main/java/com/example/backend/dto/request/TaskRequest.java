package com.example.backend.dto.request;

import java.time.LocalDate;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskRequest {

    @NotNull
    @Size(max = 100)
    private String title;

    @Size(max = 500)
    private String description;

    private Integer priority;

    private LocalDate dueDate;

    // 0以外
    @Min(1)
    private Long categoryId;

    @Min(0)
    @Max(100)
    private Integer progress;

    private Long userId;
}
