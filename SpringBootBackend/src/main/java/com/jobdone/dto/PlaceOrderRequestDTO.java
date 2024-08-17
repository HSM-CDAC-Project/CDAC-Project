package com.jobdone.dto;

import java.time.LocalDate;
import java.util.List;

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
public class PlaceOrderRequestDTO {

    private Long addressId;
    private LocalDate serviceDate;
	private Long cartId;

    private List<CartItemRequestDTO> cartItems;
    
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @ToString
    public static class CartItemRequestDTO {
        private Long packageId;
        private String packageTitle;  
        private double packagePrice;  
        private int quantity;
    }
  
}
