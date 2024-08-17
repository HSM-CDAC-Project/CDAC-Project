package com.jobdone.dto;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import com.jobdone.entity.Customer;
import com.jobdone.entity.CustomerAddress;
import com.jobdone.entity.Order;
import com.jobdone.entity.OrderStatus;
import com.jobdone.entity.Partner;
import com.jobdone.entity.Rating;
import com.jobdone.entity.ServicePackage;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import com.jobdone.entity.OrderStatus;



@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString(callSuper = true)
public class AdminOrderDetailsDTO {
private int packageQty;
	
	private LocalDate serviceDate;
	
	private OrderStatus orderStatus;
	
//	private Order orders;
	private String orderId;
	
//	private Partner partner;
	
//	private ServicePackage servicePackage;
	private String packageTitle;
	private double totalAmount;
	
//	private Customer customer;
	
	private String customerName;
	private String customerMobileNo;
	
	private String partnerName;
	private String partnerMobileNo;


	private String addressLineOne;
	
	private String addressLineTwo;
	
	private String city;
	
	private String state;
	
	private String country;
	
	private String zipCode;
	
	private String landmark;
	
//	private Rating rating;
}
