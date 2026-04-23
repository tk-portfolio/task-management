package com.example.backend.service;

import java.util.List;

import com.example.backend.dto.request.CategoryRequest;
import com.example.backend.dto.response.CategoryResponse;

public interface CategoryService {

    List<CategoryResponse> getAllCategories();

    CategoryResponse addCategory(CategoryRequest categoryRequest);

    void deleteCategory(Long id);
}
