package TestUtils;

import com.undieb.hu.main.Controllers.DTOs.BasicUserDto;
import com.undieb.hu.main.Models.Users;
import lombok.Data;

@Data
public class TestUtils {

    private final Long ID = 1L;


    public Users user(){
        return Users.builder().id(1L).build();
    }
    public BasicUserDto basicUserDto(){
        return BasicUserDto.builder().id(1L).build();
    }
}
