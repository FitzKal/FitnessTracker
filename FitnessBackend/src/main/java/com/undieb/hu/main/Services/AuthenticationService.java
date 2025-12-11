package com.undieb.hu.main.Services;
import com.undieb.hu.main.controllers.DTOs.auth.*;
import com.undieb.hu.main.converters.RegisterUserDTOToUserConverter;
import com.undieb.hu.main.Exceptions.InvalidVerificationCodeException;
import com.undieb.hu.main.Exceptions.UserNotFoundException;
import com.undieb.hu.main.Models.Role;
import com.undieb.hu.main.Repositories.UserRepository;
import com.undieb.hu.main.Security.PasswordEncrypter;
import jakarta.servlet.http.HttpServletRequest;
import lombok.*;
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
