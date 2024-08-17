package com.jobdone.service;

import java.util.List;

import com.jobdone.dto.AdminOrderDetailsDTO;
import com.jobdone.dto.PackageDetailsDTO;
import com.jobdone.dto.PartnerOrderDetailsDTO;
import com.jobdone.dto.RatingValueDTO;
import com.jobdone.dto.RespRatingValueDTO;
import com.jobdone.entity.OrderStatus;
import com.jobdone.entity.Rating;

public interface OrderDetailsService {

	List<PackageDetailsDTO> getPackageDetailsByCustomerId(String customerId);
	
	void addRatingToOrderDetail(RatingValueDTO ratingValueDTO);

	
	RespRatingValueDTO getRatingForOrderDetail(Long orderDetailId);
	
//	List<PartnerOrderDetailsDTO> getPartnerOrderDetails(String status,String partnerId);

//	List<PartnerOrderDetailsDTO> getPartnerOrderDetails(String partnerId);


	List<PartnerOrderDetailsDTO> getPartnerOrderDetails(String partnerId);
	
	List<AdminOrderDetailsDTO> getPendingOrderDetails(OrderStatus status);
	
}
