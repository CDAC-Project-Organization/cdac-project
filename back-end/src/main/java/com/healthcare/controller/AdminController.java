package com.healthcare.controller;

import com.healthcare.dtos.AdminProfileDTO;
import com.healthcare.dtos.CreateAdminRequest;
import com.healthcare.security.UserPrincipal;
import com.healthcare.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/byUser")
    public ResponseEntity<AdminProfileDTO> getAdminForLoggedInUser() {

        UserPrincipal principal = (UserPrincipal)
                SecurityContextHolder
                        .getContext()
                        .getAuthentication()
                        .getPrincipal();

        Long userId = principal.getUserId();

        return ResponseEntity.ok(
                adminService.getAdminByUserId(userId)
        );
        
    }
    
    @PostMapping("/create")
    public ResponseEntity<String> createAdmin(
            @RequestBody CreateAdminRequest request) {

        adminService.createAdmin(request);
        return ResponseEntity.ok("Admin created successfully");
    }
}
