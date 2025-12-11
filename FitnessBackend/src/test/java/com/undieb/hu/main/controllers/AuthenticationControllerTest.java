package com.undieb.hu.main.controllers;

import TestUtils.TestUtils;
import com.undieb.hu.main.Services.AuthenticationService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.mock.web.MockHttpServletRequest;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;

class AuthenticationControllerTest {

    public static final TestUtils testUtils = new TestUtils();

    @Mock
    public  AuthenticationService authenticationService;

    @InjectMocks
    public  AuthenticationController underTest;

    @BeforeEach
    public void setUp(){
        MockitoAnnotations.openMocks(this);
    }

    /*@Test
    void testRegisterUserShouldRegisterUser() {
        //Given
        given(authenticationService.registerUser(testUtils.registerUserDto()))
                .willReturn(testUtils.loginUserResponseDTO());
        //When
        var response = underTest.registerUser(testUtils.registerUserDto()).getBody();

        //Then
        assertEquals(testUtils.loginUserResponseDTO(),response);
    }*/

    @Test
    void testLoginUserShouldLoginUser() {
        //Given
        given(authenticationService.loginUser(testUtils.loginRequestDTO()))
                .willReturn(testUtils.loginUserResponseDTO());
        //When
        var response = underTest.loginUser(testUtils.loginRequestDTO()).getBody();

        //Then
        assertEquals(testUtils.loginUserResponseDTO(),response);
    }

    @Test
    void testLogoutUserShouldLogoutUser() {
        //Given
        MockHttpServletRequest req = new MockHttpServletRequest();
        //When
        underTest.logoutUser(req);
        //Then
        verify(authenticationService).logout(req);
    }
}