package com.healthcare.security;

import java.util.List;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.healthcare.entities.User;
import com.healthcare.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class CustomUserDetailsServiceImpl implements UserDetailsService {
	private final UserRepository userRepository;
	
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

	    User user = userRepository.findByEmail(email)
	            .orElseThrow(() ->
	                    new UsernameNotFoundException("User not found with email: " + email));
	    System.out.println(user.getRole());

	    return new UserPrincipal(
	            user.getId(),
	            user.getEmail(),
	            user.getPassword(),
	            List.of(new SimpleGrantedAuthority(user.getRole().name())),
	            user.getRole().name()
	    );
	}


}
