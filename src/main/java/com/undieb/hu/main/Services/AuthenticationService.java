package com.undieb.hu.main.Services;
import com.undieb.hu.main.Controllers.DTOs.LoginRequestDTO;
import com.undieb.hu.main.Controllers.DTOs.LoginUserResponseDTO;
import com.undieb.hu.main.Controllers.DTOs.RegisterUserDto;
import com.undieb.hu.main.Converters.RegisterUserDTOToUserConverter;
import com.undieb.hu.main.Exceptions.UserNotFoundException;
import com.undieb.hu.main.Models.Role;
import com.undieb.hu.main.Repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JWTService jwtService;
    private final RegisterUserDTOToUserConverter registerUserDTOToUserConverter;

    public LoginUserResponseDTO registerUser(RegisterUserDto registerUserDto){
        var convertedToUser = registerUserDTOToUserConverter.convertRegisterUserDTOToUser(registerUserDto);
        convertedToUser.setRole(Role.USER);
        userRepository.save(convertedToUser);
        var authToken = jwtService.generateToken(registerUserDto.getUsername());
        return new LoginUserResponseDTO(registerUserDto.getUsername(),authToken);
    }

    public LoginUserResponseDTO loginUser(LoginRequestDTO loginRequestDTO){
        if (checkCredential(loginRequestDTO)){
            var authToken = jwtService.generateToken(loginRequestDTO.getUsername());
            return new LoginUserResponseDTO(loginRequestDTO.getUsername(),authToken);
        }
        throw new UserNotFoundException("Invalid login credentials!");
    }

    private Boolean checkCredential(LoginRequestDTO requestDTO){
        var userToLogin = userRepository.findByUsername(requestDTO.getUsername());
        return passwordEncoder.matches(requestDTO.getPassword(),userToLogin.getPassword());
    }
}
