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
public class CustomerAddressDTO extends BaseDTO{
	
	private String addressLineOne;
	
	private String addressLineTwo;
	
	private String city;
	
	private String state;
	
	private String country;
	
	private String zipCode;
	
	private String landmark;
}
