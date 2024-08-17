package com.jobdone.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString(callSuper = true)
public class AdminLoginRespDTO {

//	@JsonProperty(access = Access.READ_ONLY)
//	private String empId;
//	private String status;
//	private String firstName;
//	private String lastName;
	
	private String jwt;
	private String msg;
	private String otp;

}
