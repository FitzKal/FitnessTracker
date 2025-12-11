package com.undieb.hu.main.controllers;

import TestUtils.TestUtils;
import com.undieb.hu.main.controllers.DTOs.user.BasicUserDto;
import com.undieb.hu.main.converters.UsersToBasicUserDtoConverter;
import com.undieb.hu.main.Services.UsersService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mapstruct.factory.Mappers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;

class UsersControllerTest {

    private final TestUtils testUtils = new TestUtils();

    @Mock
    private UsersService usersService;

    @Mock
    private UsersToBasicUserDtoConverter usersToBasicUserDtoConverter = Mappers.getMapper(UsersToBasicUserDtoConverter.class);

    @InjectMocks
    private UsersController underTest;

    @BeforeEach
    public void setUp(){
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetUserShouldReturnCorrectUser() {
        //Given
        given(usersService.getUser(testUtils.getID())).willReturn(testUtils.basicUserDto());
        //When
        var gotUser = underTest.getUser(testUtils.getID()).getBody();
        //Then
        assertEquals(testUtils.basicUserDto(),gotUser);
    }

    @Test
    void getAll() {
        //Given
        List<BasicUserDto> expectedList = new ArrayList<>();
        expectedList.add(testUtils.basicUserDto());
        given(usersService.getAllUsers()).willReturn(expectedList);
        //When
        var gotList = underTest.getAll().getBody();
        //Then
        assertEquals(expectedList,gotList);
    }

    @Test
    void deleteUser() {
        //Given

        //When
        underTest.deleteUser(testUtils.getID());
        //Then
        verify(usersService).deleteUser(testUtils.getID());
    }

    @Test
    void updateUser() {
        //Given

        //When
        underTest.updateUser(testUtils.getID(),testUtils.basicUserDto());

        //Then
        verify(usersService).updateUser(testUtils.getID(),testUtils.basicUserDto());

    }

    @Test
    void saveUser() {
        //Given
        given(usersService.saveUser(testUtils.basicUserDto())).willReturn(testUtils.user());
        given(usersToBasicUserDtoConverter.userToBasicUserDto(testUtils.user())).willReturn(testUtils.basicUserDto());
        //When
        var returnedUser =  underTest.saveUser(testUtils.basicUserDto()).getBody();
        //Then
        assertEquals(testUtils.basicUserDto(),returnedUser);
    }
}