package TestUtils;

import com.undieb.hu.main.Controllers.DTOs.BasicUserDto;
import com.undieb.hu.main.Controllers.DTOs.LoginRequestDTO;
import com.undieb.hu.main.Controllers.DTOs.LoginUserResponseDTO;
import com.undieb.hu.main.Controllers.DTOs.RegisterUserDto;
import com.undieb.hu.main.Models.Users;
import lombok.Data;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Data
public class TestUtils {

    private final Long ID = 1L;
    private final String encryptedPassword = "EncryptedPassword";
    private final String password = "password";
    private final String username = "Username";
    private final String accessToken = "token";


    public Users user(){
        return Users.builder().id(1L).build();
    }
    public BasicUserDto basicUserDto(){
        return BasicUserDto.builder().id(1L).build();
    }

    public RegisterUserDto registerUserDto(){
        return RegisterUserDto.builder().username(username).password(password).build();
    }

    public LoginUserResponseDTO loginUserResponseDTO(){
        return LoginUserResponseDTO.builder().username(username).accessToken(accessToken).build();
    }
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder(10);
    }

    public LoginRequestDTO loginRequestDTO(){
        return LoginRequestDTO.builder().username(getUsername()).password(getPassword()).build();
    }
}
