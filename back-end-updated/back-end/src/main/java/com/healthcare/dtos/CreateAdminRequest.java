package com.healthcare.dtos;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class CreateAdminRequest {

    private String name;
    private String email;
    private String password;
    private String phone;
}
