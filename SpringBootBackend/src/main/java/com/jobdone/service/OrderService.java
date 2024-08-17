package com.jobdone.service;

import java.util.List;

import com.jobdone.dto.ApiResponse;
import com.jobdone.dto.GetCartItemsDTO;
import com.jobdone.dto.PlaceOrderRequestDTO;

public interface OrderService {

	ApiResponse placeOrder(PlaceOrderRequestDTO placeOrderDTO);

}
