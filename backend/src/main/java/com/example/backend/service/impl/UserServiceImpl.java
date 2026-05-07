package com.example.backend.service.impl;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.backend.dto.request.UserRequest;
import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.security.JwtUtil;
import com.example.backend.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public String login(UserRequest request) {

        String username = request.getUsername();

        User user = userRepository.findByUsername(username);

        if (user == null) {
            throw new IllegalStateException("ユーザーが見つかりません。");
        }

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalStateException("パスワードが違います。");
        }

        String token = jwtUtil.generateToken(user.getId());
        return token;
    }

    @Override
    public String register(UserRequest request) {

        // usernameが被ってないか
        String username = request.getUsername();
        User exitedUser = userRepository.findByUsername(username);

        // ユーザー名が被っていたら
        if (exitedUser != null) {
            throw new IllegalStateException("このユーザー名は使用されています。");
        }

        String hashedPassword = passwordEncoder.encode(request.getPassword());

        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(hashedPassword);

        userRepository.save(user);

        String token = jwtUtil.generateToken(user.getId());
        return token;
    }

}
