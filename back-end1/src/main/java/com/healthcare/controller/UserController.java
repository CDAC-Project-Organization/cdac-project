package com.healthcare.controller;



import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import lombok.RequiredArgsConstructor;

@RestController //= @Controller + @ResponseBody
@RequestMapping("/users")  //base url-pattern
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor //Creates a parameterized ctor having final & non null fields
@Validated
public class UserController {
	

}
