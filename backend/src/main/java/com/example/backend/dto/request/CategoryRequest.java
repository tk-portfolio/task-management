package com.example.backend.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CategoryRequest {

    @NotNull
    @Size(max = 50)
    private String name;

    @Size(max = 200)
    private String description;

    private Boolean deleted;

    private String color;

    private Long userId;
}
