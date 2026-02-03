package com.undieb.hu.main.controllers;

import com.undieb.hu.main.controllers.DTOs.user.BasicUserDto;
import com.undieb.hu.main.services.AdminService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/fitness/admin")
public class AdminController {
    private AdminService adminService;

    @GetMapping
    private ResponseEntity<List<BasicUserDto>> getAllUsers(){
        return ResponseEntity.ok(adminService.getAllUsers());
    }

    @PostMapping
    private ResponseEntity<List<BasicUserDto>> searchUser(@RequestParam String keyWord){
        return ResponseEntity.ok(adminService.getUsersBySearch(keyWord));
    }

    @DeleteMapping
    private ResponseEntity<String> deleteUser(@RequestParam Long id){
        return ResponseEntity.ok(adminService.deleteUser(id));
    }

}
