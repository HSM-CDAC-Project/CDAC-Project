package com.jobdone.dto;

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
public class PartnerLoginRespDTO {
//	@JsonProperty(access = Access.READ_ONLY)
//	private String partnerId;
//	
//	private String firstName;
//	
//	private String lastName;
//	
//	private String email;
//	
//	private String mobileNo;
	
	private String jwt;
	private String msg;
}
