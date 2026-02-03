package com.undieb.hu.main.services;

import com.undieb.hu.main.controllers.DTOs.user.BasicUserDto;
import com.undieb.hu.main.converters.UsersToBasicUserDtoConverter;
import com.undieb.hu.main.exceptions.UserNotFoundException;
import com.undieb.hu.main.models.Users;
import com.undieb.hu.main.models.enums.Role;
import com.undieb.hu.main.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class AdminService {
    private UserRepository userRepository;
    private UsersToBasicUserDtoConverter usersToBasicUserDtoConverter;

    public List<BasicUserDto> getAllUsers (){
        return userRepository.findAll().stream()
                .map(usersToBasicUserDtoConverter::userToBasicUserDto)
                .toList();
    }

    public List<BasicUserDto> getUsersBySearch(String keyword){
        return userRepository.findAll().stream()
                .filter(users -> users.getUsername().toLowerCase().contains(keyword.toLowerCase()))
                .map(usersToBasicUserDtoConverter::userToBasicUserDto)
                .toList();
    }

    public String deleteUser(Long id){
        if (userRepository.existsById(id)){
            userRepository.deleteById(id);
            return "The user has been deleted";
        }

        throw new UserNotFoundException("User not Found");
    }

    public String updateUser(Long id, Role role) {
        Users user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found"));
        user.setRole(role);
        userRepository.save(user);
        return ("The role of the user has been updated");
    }
}
