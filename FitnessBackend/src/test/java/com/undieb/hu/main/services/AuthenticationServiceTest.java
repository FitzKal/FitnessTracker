package com.undieb.hu.main.services;

import TestUtils.TestUtils;
import com.undieb.hu.main.converters.RegisterUserDTOToUserConverter;
import com.undieb.hu.main.repositories.UserRepository;
import com.undieb.hu.main.security.PasswordEncrypter;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mapstruct.factory.Mappers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.mock.web.MockHttpServletRequest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;

class AuthenticationServiceTest {
    private final TestUtils testUtils = new TestUtils();

    @Mock
    private UserRepository userRepository;

    @Mock
    public static PasswordEncrypter passwordEncrypter;

    @Mock
    public static JWTService jwtService;

    @Mock
    public static RegisterUserDTOToUserConverter registerUserDTOToUserConverter =
            Mappers.getMapper(RegisterUserDTOToUserConverter.class);

    @InjectMocks
    public AuthenticationService underTest;

    @BeforeEach
    public void setUp(){
        MockitoAnnotations.openMocks(this);
    }

   /* @Test
    void testRegisterUserShouldRegisterUser() {
        //Given
        var userToBeSaved = testUtils.user();
        userToBeSaved.setRole(Role.USER);
        userToBeSaved.setUsername(testUtils.getUsername());
        userToBeSaved.setPassword(testUtils.getEncryptedPassword());
        var userConverted = testUtils.user();
        userConverted.setUsername(testUtils.getUsername());
        given(registerUserDTOToUserConverter.convertRegisterUserDTOToUser(testUtils.registerUserDto()))
                .willReturn(userConverted);
        given(passwordEncrypter.passwordEncoder())
                .willReturn(testUtils.passwordEncoder());
        given(jwtService.generateToken(testUtils.getUsername()))
                .willReturn(testUtils.getAccessToken());
        var expectedResult = testUtils.loginUserResponseDTO();
        //When
        var loginResponse = underTest.registerUser(testUtils.registerUserDto());
        //Then
        verify(userRepository).save(userToBeSaved);
        assertEquals(expectedResult,loginResponse);

    }*/

    @Test
    void testLoginUserShouldLoginUser() {
         // Given
        var req = testUtils.loginRequestDTO();
        var encoder = testUtils.passwordEncoder();
        var user = testUtils.user();
        user.setUsername(req.getUsername());
        user.setPassword(encoder.encode(req.getPassword()));
        given(userRepository.findByUsername(req.getUsername())).willReturn(user);
        given(passwordEncrypter.passwordEncoder()).willReturn(encoder);
        given(jwtService.generateToken(req.getUsername())).willReturn(testUtils.getAccessToken());

        var expected = testUtils.loginUserResponseDTO();

        // When
        var actual = underTest.loginUser(req);

        // Then
        assertEquals(expected, actual);
        verify(jwtService).generateToken(req.getUsername());
    }

    @Test
    public void testLogoutShouldAddTokenToBlackList(){
        //Given
        MockHttpServletRequest req = new MockHttpServletRequest();
        //When
        underTest.logout(req);
        //Then
        verify(jwtService).addToBlackList(req);
    }
}