package com.jobdone.dto;

import java.time.LocalDate;

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
public class PackageDetailsDTO {

	private String packageTitle;
	private int packageQty;
	private double totalAmount;
	private LocalDate orderDate;
	private OrderStatus orderStatus;
	private String status;
	
}
