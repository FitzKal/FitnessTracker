package com.undieb.hu.main.Services;

import TestUtils.TestUtils;
import com.undieb.hu.main.controllers.DTOs.user.BasicUserDto;
import com.undieb.hu.main.Converters.UsersToBasicUserDtoConverter;
import com.undieb.hu.main.Models.Users;
import com.undieb.hu.main.Repositories.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mapstruct.factory.Mappers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;

class UsersServiceTest {
    private static final TestUtils TEST_UTILS = new TestUtils();

    @Mock
    private UsersToBasicUserDtoConverter usersToBasicUserDtoConverter = Mappers.getMapper(UsersToBasicUserDtoConverter.class);

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private  UsersService underTest;

    @BeforeEach
    public void setUp(){
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetUserShouldReturnCorrectUser(){
        //Given
        given(userRepository.findById(TEST_UTILS.getID())).willReturn(Optional.of(TEST_UTILS.user()));
        given(usersToBasicUserDtoConverter.userToBasicUserDto(TEST_UTILS.user())).willReturn(TEST_UTILS.basicUserDto());
        //When
        var expectedUser = underTest.getUser(TEST_UTILS.getID());
        //Then
        assertEquals(TEST_UTILS.basicUserDto(),expectedUser);
    }

    @Test
    public void testGetAllUsersShouldReturnListOfUsers(){
        //Given
        List<BasicUserDto> listToTest = new ArrayList<>();
        listToTest.add(TEST_UTILS.basicUserDto());
        List<Users> repList = new ArrayList<>();
        repList.add(TEST_UTILS.user());
        given(userRepository.findAll()).willReturn(repList);
        given(usersToBasicUserDtoConverter.userToBasicUserDto(TEST_UTILS.user())).willReturn(TEST_UTILS.basicUserDto());
        //When
        var listGoBack = underTest.getAllUsers();
        //Then
        assertEquals(listToTest,listGoBack);
    }

    @Test
    public void testSaveUserShouldCreateUser(){
        //Given
        given(usersToBasicUserDtoConverter.basicUserDtoToUser(TEST_UTILS.basicUserDto())).willReturn(TEST_UTILS.user());
        //When
        underTest.saveUser(TEST_UTILS.basicUserDto());
        //Then
        verify(userRepository).save(TEST_UTILS.user());
    }

    @Test
    public void testUpdateUserShouldUpdateUser(){
        //Given
        var dto = TEST_UTILS.basicUserDto();
        dto.setEmail("s");
        var userToTest = TEST_UTILS.user();
        userToTest.setEmail("s");
        given(userRepository.findById(TEST_UTILS.getID())).willReturn(Optional.of(TEST_UTILS.user()));
        //When
        underTest.updateUser(1L,dto);
        //Then
        verify(userRepository).save(userToTest);
    }

    @Test
    public void testDeleteUserShouldDeleteUser(){
        //Given

        //When
        underTest.deleteUser(TEST_UTILS.getID());
        //Then
        verify(userRepository).deleteById(TEST_UTILS.getID());
    }

}