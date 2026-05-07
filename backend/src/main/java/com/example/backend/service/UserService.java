package com.example.backend.service;

import com.example.backend.dto.request.UserRequest;

public interface UserService {

    public String login(UserRequest request);

    public String register(UserRequest request);

}
