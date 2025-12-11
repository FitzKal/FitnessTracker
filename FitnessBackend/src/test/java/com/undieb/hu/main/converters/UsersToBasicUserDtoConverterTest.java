package com.undieb.hu.main.converters;

import TestUtils.TestUtils;
import org.junit.jupiter.api.Test;
import org.mapstruct.factory.Mappers;

import static org.junit.jupiter.api.Assertions.*;

class UsersToBasicUserDtoConverterTest {

    private static final TestUtils TEST_UTILS = new TestUtils();
    private UsersToBasicUserDtoConverter underTest = Mappers.getMapper(UsersToBasicUserDtoConverter.class);


    @Test
    void testUserToBasicUserDtoShouldReturnBasicUserDto() {
        //Given

        //When
        var convertedUser = underTest.userToBasicUserDto(TEST_UTILS.user());
        //Then
        assertEquals(TEST_UTILS.basicUserDto(),convertedUser);
    }

    @Test
    void testBasicUserDtoToUserShouldReturnUser() {
        //Given

        //When
        var convertedUser = underTest.basicUserDtoToUser(TEST_UTILS.basicUserDto());
        //Then
        assertEquals(TEST_UTILS.user(),convertedUser);
    }
}