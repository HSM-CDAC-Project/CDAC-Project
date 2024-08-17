package com.jobdone.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class GetCartItemsDTO {
	private Long cartId;
    private Long packageId;
    private String packageTitle;  
    private double packagePrice;  
    private int quantity;
    private double totalAmount;  
}
