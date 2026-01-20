package com.undieb.hu.main.services;
import com.undieb.hu.main.controllers.DTOs.auth.*;
import com.undieb.hu.main.converters.RegisterUserDTOToUserConverter;
import com.undieb.hu.main.exceptions.InvalidVerificationCodeException;
import com.undieb.hu.main.exceptions.UserAlreadyExistsException;
import com.undieb.hu.main.exceptions.UserNotFoundException;
import com.undieb.hu.main.models.enums.Role;
import com.undieb.hu.main.repositories.UserRepository;
import com.undieb.hu.main.security.PasswordEncrypter;
import jakarta.servlet.http.HttpServletRequest;
import lombok.*;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

@Service
@Data
@AllArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncrypter passwordEncrypter;
    private final JWTService jwtService;
    private final RegisterUserDTOToUserConverter registerUserDTOToUserConverter;
    private final EmailSenderService emailSenderService;

    public RegisterUserResponse registerUser(RegisterUserDto registerUserDto){
        if (userRepository.existsByEmail(registerUserDto.getEmail())){
            throw new UserAlreadyExistsException("A user with this email already exists");
        }
        if (userRepository.existsByUsername(registerUserDto.getUsername())){
            throw new UserAlreadyExistsException("A user with this username already exists");
        }
            var convertedToUser = registerUserDTOToUserConverter.convertRegisterUserDTOToUser(registerUserDto);
            convertedToUser.setRole(Role.USER);
            convertedToUser.setPassword(passwordEncrypter.passwordEncoder()
                    .encode(registerUserDto.getPassword()));
            var registerDetails = emailSenderService.sendEmail(convertedToUser.getEmail());
            return RegisterUserResponse.builder().user(convertedToUser)
                    .otpTime(registerDetails.getOtpTime()).lastOTP(registerDetails.getLastOTP()).build();
    }

    public LoginUserResponseDTO confirmRegistration(String verificationCode, RegisterUserResponse registerUserResponse){
        if (emailSenderService.verifyOtp(verificationCode,registerUserResponse)){
            userRepository.save(registerUserResponse.getUser());
            var token = jwtService.generateToken(registerUserResponse.getUser().getUsername());
            return new LoginUserResponseDTO(registerUserResponse.getUser().getUsername(),token,registerUserResponse.getUser().getRole());
        }else{
            throw new InvalidVerificationCodeException("The given verification code is incorrect");
        }
    }

    public LoginUserResponseDTO loginUser(LoginRequestDTO loginRequestDTO){
        if (checkCredential(loginRequestDTO)){
            var userToLogin = userRepository.findByUsername(loginRequestDTO.getUsername());
            var authToken = jwtService.generateToken(loginRequestDTO.getUsername());
            return new LoginUserResponseDTO(loginRequestDTO.getUsername(),authToken,userToLogin.getRole());
        }
        throw new UserNotFoundException("Invalid login credentials!");
    }

    public VerificationDetails sendResetToken(String recipientEmail){
        if (userRepository.existsByEmail(recipientEmail)){
            return emailSenderService.sendPasswordResetToken(recipientEmail);
        }else{
            throw new UserNotFoundException("The given email is not associated with a user");
        }
    }

    public String changePassword(String password, String email){
        var userToUpdate = userRepository.findByEmail(email);
        userToUpdate.setPassword(passwordEncrypter.passwordEncoder()
                .encode(password));
        userRepository.save(userToUpdate);
        return "Password successfully changed!";
    }

    public Boolean verifyToken(PasswordChangeResponse passwordChangeResponse, String otpToVerify){
        var isValid  = emailSenderService.verifyResetToken(otpToVerify, passwordChangeResponse);
        if (!isValid){
            throw new InvalidVerificationCodeException("The given token is invalid");
        }
        return true;
    }

    private Boolean checkCredential(LoginRequestDTO requestDTO){
        var userToLogin = userRepository.findByUsername(requestDTO.getUsername());
        if (userToLogin != null)
        return passwordEncrypter.passwordEncoder().matches(requestDTO.getPassword(),userToLogin.getPassword());
        else
            throw new UserNotFoundException("User not found");
    }


    public void logout(HttpServletRequest request){
        jwtService.addToBlackList(request);
    }

    public VerificationDetails resendVerificationCode(String email){
        return emailSenderService.sendEmail(email);
    }
}
