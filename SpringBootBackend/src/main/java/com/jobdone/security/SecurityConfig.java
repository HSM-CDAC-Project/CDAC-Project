package com.jobdone.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity//to enable spring sec frmwork support
@Configuration //to tell SC , this is config class containing @Bean methods
@EnableGlobalMethodSecurity(prePostEnabled = true)
//To enable method level authorization support : pre n post authorization
public class SecurityConfig {
	//dep : pwd encoder
	@Autowired
	private PasswordEncoder enc;
	//dep : custom jwt auth filter
	@Autowired
	private JwtAuthenticationFilter jwtFilter;
	//dep : custom auth entry point
	@Autowired
	private CustomAuthenticationEntryPoint authEntry;
	
	
	@Bean
	public SecurityFilterChain authorizeRequests(HttpSecurity http) throws Exception
	{
		//URL based authorization rules
		http.cors()
		.and().
		//disable CSRF token generation n verification
		csrf()	.disable()
		.exceptionHandling().authenticationEntryPoint(authEntry).
		and().
		authorizeRequests()
		.antMatchers("/service/**","/customers/login","/customers/register",
			"/admin/login","/partner/login","/partner/register",
				"/v*/api-doc*/**","/swagger-ui/**").permitAll()
		// only required for JS clnts (react / angular) : for the pre flight requests
		.antMatchers(HttpMethod.OPTIONS).permitAll()
		.antMatchers("/customers/updateEmail","/customers/updateMobileNo","/customers/details/**",
				"/customers/password/**","/customers/updatepassword/**",
				"/customers/{customerId}/orders","/customers/addrating",
				"/customers/{orderDetailsId}", "/customers/image/{customerId}",
				"/customers/{customerId}/address", "/customers/address/**",
				"/customers/cart/**","/customers/placeOrder").hasRole("CUSTOMER")
		.antMatchers("/partner/updateEmail", "/partner/updateMobileNo", "/partner/details/**",
                "/partner/updatepassword/**", "/partner/assignedorders/**",
                "/partner/{detailsId}/updateStatus").hasRole("PARTNER")
		.antMatchers("/admin/ActiveOrders", "/admin/partnerList", "/admin/partnerPendingList", 
                "/admin/approve/**", "/admin/delete/**", "/admin/updatepassword/**", 
                "/admin/image/{partnerId}", "/admin/addPackage").hasRole("ADMIN")
		.antMatchers("/partner/image/{partnerId}").hasAnyRole("PARTNER", "ADMIN")

		.anyRequest().authenticated()
		.and()
		//to tell spring sec : not to use HttpSession to store user's auth details
		.sessionManagement()
		.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
		.and()
		//inserting jwt filter before sec filter
		.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
	
		return http.build();
	}
	//configure AuthMgr as a spring bean
	@Bean
	public AuthenticationManager authenticationManager
	(AuthenticationConfiguration config) throws Exception
	{
		return config.getAuthenticationManager();
	}
}
