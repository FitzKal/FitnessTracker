package com.undieb.hu.main.Services;

import TestUtils.TestUtils;
import com.undieb.hu.main.Converters.UsersToBasicUserDtoConverter;
import com.undieb.hu.main.Repositories.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.given;

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

}