package com.undieb.hu.main.Controllers;

import com.undieb.hu.main.Controllers.DTOs.user.BasicUserDto;
import com.undieb.hu.main.Converters.UsersToBasicUserDtoConverter;
import com.undieb.hu.main.Services.UsersService;
import lombok.AllArgsConstructor;
import lombok.NonNull;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/fitness/users")
public class UsersController {
    private UsersService usersService;
    private UsersToBasicUserDtoConverter usersToBasicUserDtoConverter;

    @GetMapping("/{id}")
    public ResponseEntity<BasicUserDto> getUser(@PathVariable Long id){
        return ResponseEntity.ok(usersService.getUser(id));
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<BasicUserDto>> getAll(){
        return ResponseEntity.ok(usersService.getAllUsers());
    }

    @DeleteMapping
    public ResponseEntity<String> deleteUser(@NonNull Long id){
        usersService.deleteUser(id);
        return ResponseEntity.ok("The user was successfully deleted!");
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateUser(
            @NonNull @PathVariable Long id,
            @NonNull @RequestBody BasicUserDto basicUserDto
    ){
        usersService.updateUser(id,basicUserDto);
        return ResponseEntity.ok("The user with the id: " + id + " was updated." );
    }

    @PostMapping
    public ResponseEntity<BasicUserDto> saveUser(@NonNull @RequestBody BasicUserDto basicUserDto){
        var newUser = usersService.saveUser(basicUserDto);
        return ResponseEntity.ok(usersToBasicUserDtoConverter.userToBasicUserDto(newUser));
    }

}
