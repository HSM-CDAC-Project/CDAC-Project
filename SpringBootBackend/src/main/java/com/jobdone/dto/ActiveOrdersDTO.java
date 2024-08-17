package com.jobdone.dto;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import com.jobdone.entity.Customer;
import com.jobdone.entity.CustomerAddress;
import com.jobdone.entity.OrderStatus;

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
public class ActiveOrdersDTO {

	private CustomerDetailsDTO customer;
	private CustomerAddressDTO address;
	private String orderId;
	private String packageTitle;
	private int packageQty;
	private double totalAmount;
	private LocalDate orderDate;
	private LocalDate serviceDate;
	private ActiveOrdersPartnerDTO partner;
}
