package com.jobdone.dto;

import com.jobdone.entity.ServiceTitle;
import com.jobdone.value_types.CardType;
import com.jobdone.value_types.IdentityCard;

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
public class PartnerRegisterDTO {


		private String firstName;
		private String lastName;
		private String email;
		private String mobileNo;
		private String password;
		private ServiceTitle serviceTitle;
		private String cardNumber;
		private CardType cardType;
		private String addressLineOne;
		private String addressLineTwo;
		private String city;	
		private String state;
		private String country;	
		private String zipCode;
		private String landmark;

	}