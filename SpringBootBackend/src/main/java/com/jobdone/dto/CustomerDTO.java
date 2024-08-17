package com.jobdone.dto;

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
	
public class CustomerDTO {

	private String firstName;
	
	private String lastName;
	
	private String email;
	
	private String mobileNo;
	
	private String password;
	
}
