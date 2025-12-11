package com.undieb.hu.main.Services;

import com.undieb.hu.main.controllers.DTOs.user.BasicUserDto;
import com.undieb.hu.main.converters.UsersToBasicUserDtoConverter;
import com.undieb.hu.main.exceptions.UserNotFoundException;
import com.undieb.hu.main.Models.Users;
import com.undieb.hu.main.Repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class UsersService {
    private final UserRepository userRepository;
    private final UsersToBasicUserDtoConverter usersToBasicUserDtoConverter;

    public BasicUserDto getUser(Long id){
       return userRepository.findById(id)
                .map(usersToBasicUserDtoConverter::userToBasicUserDto).
                orElseThrow(()-> new UserNotFoundException("The User Cannot be found"));
    }

    public List<BasicUserDto> getAllUsers(){
        return userRepository.findAll().stream()
                .map(usersToBasicUserDtoConverter::userToBasicUserDto).toList();
    }

    public void deleteUser(Long id){
        userRepository.deleteById(id);
    }

    public void updateUser(Long id,BasicUserDto basicUserDto){
        var userToUpdate = userRepository.findById(id)
                .orElseThrow(()-> new UserNotFoundException("The User cannot be found."));
        userToUpdate.setEmail(basicUserDto.getEmail());
        userToUpdate.setPassword(basicUserDto.getPassword());
        userToUpdate.setEmail(basicUserDto.getUsername());
        userRepository.save(userToUpdate);
    }

    public Users saveUser(BasicUserDto basicUserDto){
        var userToSave = usersToBasicUserDtoConverter.basicUserDtoToUser(basicUserDto);
        return (userRepository.save(userToSave));
    }
}

