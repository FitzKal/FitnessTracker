package com.undieb.hu.main.Services;
import com.undieb.hu.main.Controllers.DTOs.LoginRequestDTO;
import com.undieb.hu.main.Controllers.DTOs.LoginUserResponseDTO;
import com.undieb.hu.main.Controllers.DTOs.RegisterUserDto;
import com.undieb.hu.main.Converters.RegisterUserDTOToUserConverter;
import com.undieb.hu.main.Exceptions.UserNotFoundException;
import com.undieb.hu.main.Models.Role;
import com.undieb.hu.main.Models.Users;
import com.undieb.hu.main.Repositories.UserRepository;
import com.undieb.hu.main.Security.PasswordEncrypter;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncrypter passwordEncrypter;
    private final JWTService jwtService;
    private final RegisterUserDTOToUserConverter registerUserDTOToUserConverter;
    private final EmailSenderService emailSenderService;
    private Users currentUser;

    public String registerUser(RegisterUserDto registerUserDto){
        var convertedToUser = registerUserDTOToUserConverter.convertRegisterUserDTOToUser(registerUserDto);
        convertedToUser.setRole(Role.USER);
        convertedToUser.setPassword(passwordEncrypter.passwordEncoder()
                .encode(registerUserDto.getPassword()));
        this.currentUser = convertedToUser;
        return "Verification code Sent";
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
}
