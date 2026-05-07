package com.example.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.entity.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByUserId(Long userId);

    boolean existsByCategoryId(Long categoryId);

    Optional<Task> findByIdAndUserId(Long id, Long userId);
}
