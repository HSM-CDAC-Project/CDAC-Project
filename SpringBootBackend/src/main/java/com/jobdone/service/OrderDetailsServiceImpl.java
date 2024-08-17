package com.jobdone.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jobdone.custom_exception.ResourceNotFoundException;
import com.jobdone.dto.AdminOrderDetailsDTO;
import com.jobdone.dto.PackageDetailsDTO;
import com.jobdone.dto.PartnerOrderDetailsDTO;
import com.jobdone.dto.RatingValueDTO;
import com.jobdone.dto.RespRatingValueDTO;
import com.jobdone.entity.OrderDetails;
import com.jobdone.entity.OrderStatus;
import com.jobdone.entity.Rating;
import com.jobdone.entity.ServicePackage;
import com.jobdone.repository.OrderDetailsRepository;
import com.jobdone.repository.RatingRepository;
import com.jobdone.repository.ServicePackageRepository;

@Service
@Transactional
public class OrderDetailsServiceImpl implements OrderDetailsService {
	@Autowired
	private OrderDetailsRepository orderDetailsRepository;
	
	@Autowired
	private RatingRepository ratingRepository;
	
	@Autowired
	private ServicePackageRepository servicePackageRepository;
	
	@Autowired
	private ModelMapper modelMapper;

	private OrderStatus OrderStatus;
	
	@Override
	public List<PackageDetailsDTO> getPackageDetailsByCustomerId(String customerId) {
		return orderDetailsRepository.findOrderDetailsWithPackagesByCustomerId(customerId)
		.stream()
        .map(orderDetails -> {
        	//create new PackageDetailsDTO  to hold a mapped data
            PackageDetailsDTO dto = new PackageDetailsDTO();
            
            //set the title of service page
            dto.setPackageTitle(orderDetails.getServicePackage().getPackageTitle());
            
            //set the ordered package quantity
            dto.setPackageQty(orderDetails.getPackageQty());
            
            //calculate and set total amount (price * qty)
            dto.setTotalAmount(orderDetails.getServicePackage().getPackagePrice()*orderDetails.getPackageQty());
            
            //set the date when order was created
            dto.setOrderDate(orderDetails.getOrders().getCreatedOn());
            
            //set the status of order (pending/cancelled/completed)
            dto.setOrderStatus(orderDetails.getOrderStatus());
            
            
            return dto;
        })
        .collect(Collectors.toList());
	}
	



//	@Override
//	public List<PackageDetailsDTO> getPackageDetailsByCustomerId(String customerId) {
//		List<OrderDetails> orderDetails = orderDetailsRepository.findOrderDetailsWithPackagesByCustomerId(customerId);
//		return orderDetails.stream().map(od -> modelMapper.map(od, PackageDetailsDTO.class)).collect(Collectors.toList());
//			}

	

	
	@Override
	public void addRatingToOrderDetail(RatingValueDTO ratingValueDTO) {
		//fetch OrderDetails entity
		OrderDetails orderDetails = orderDetailsRepository.findById(ratingValueDTO.getOrderDetailsId()).orElseThrow(()-> new ResourceNotFoundException("order details not found: "+ratingValueDTO.getOrderDetailsId()));
		ServicePackage servicePackage = servicePackageRepository.findById(ratingValueDTO.getServicePackageId()).orElseThrow(()-> new ResourceNotFoundException("service package not found: "+ratingValueDTO.getServicePackageId()));
		
		
		Rating rating = modelMapper.map(ratingValueDTO,Rating.class);
		
		//use helper method to add rating
		orderDetails.addRating(rating);
		
		//add order_details_id in rating table
		rating.setOrdersDetails(orderDetails);
		
		//add package id in rating table
		rating.setServicePackage(servicePackage);
		
		//update raing_id in order_details table
		ratingRepository.save(rating);		
	}


	@Override
	public RespRatingValueDTO getRatingForOrderDetail(Long orderDetailId) {
		
		OrderDetails orderDetails	= orderDetailsRepository.findById(orderDetailId).orElseThrow(()-> new ResourceNotFoundException("order details not found: " +orderDetailId));
		
		//get the rating associated with the OrderDetails
		Rating rating = orderDetails.getRating();
		
		RespRatingValueDTO ratingValueDTO = new RespRatingValueDTO();
		
		if(rating != null) {
			
			ratingValueDTO = modelMapper.map(rating, RespRatingValueDTO.class);
			//use of optional as modelmapper does not handle optional
			//optional is added to handle the null value if rating is not given and is null
			ratingValueDTO.setRating(Optional.of(rating.getRating()));
			
		}
		else {
			//set rating empty if rating is null
			ratingValueDTO.setRating(Optional.empty());
		}
		return ratingValueDTO;
	}




	@Override
	public List<PartnerOrderDetailsDTO> getPartnerOrderDetails(String partnerId) {
		List<PartnerOrderDetailsDTO> orderList = orderDetailsRepository.findOrderStatusByPartnerId(partnerId)
				.stream()
				.map(orderDetail ->{
					PartnerOrderDetailsDTO dto = new PartnerOrderDetailsDTO();
					
					dto.setOrderStatus(orderDetail.getOrderStatus());
					dto.setPackageQty(orderDetail.getPackageQty());
//					dto.setPartner(orderDetail.getPartner());
//					dto.setServicePackage(orderDetail.getServicePackage());
					dto.setServiceDate(orderDetail.getServiceDate());
//					dto.setOrders(orderDetail.getOrders());
					dto.setOrderId(orderDetail.getOrders().getOrderId());
					dto.setPackageTitle(orderDetail.getServicePackage().getPackageTitle());
					dto.setTotalAmount(orderDetail.getServicePackage().getPackagePrice()*orderDetail.getPackageQty());
//					dto.setAddress(orderDetail.getOrders().getAddress());
					dto.setCustomerName(orderDetail.getOrders().getCustomer().getFirstName());
					dto.setMobileNo(orderDetail.getOrders().getCustomer().getMobileNo());
					dto.setAddressLineOne(orderDetail.getOrders().getAddress().getAddressLineOne());
					dto.setAddressLineTwo(orderDetail.getOrders().getAddress().getAddressLineTwo());
					dto.setCity(orderDetail.getOrders().getAddress().getCity());
					dto.setCountry(orderDetail.getOrders().getAddress().getCountry());
					dto.setLandmark(orderDetail.getOrders().getAddress().getLandmark());
					dto.setState(orderDetail.getOrders().getAddress().getState());
					dto.setZipCode(orderDetail.getOrders().getAddress().getZipCode());
					
					return dto;})
				.collect(Collectors.toList());
		return orderList;
	}




	@Override
	public List<AdminOrderDetailsDTO> getPendingOrderDetails(OrderStatus status) {
		List<AdminOrderDetailsDTO> orderList = orderDetailsRepository.findOrderByStatusPending(status)
				.stream()
				.map(orderDetail ->{
					AdminOrderDetailsDTO dto = new AdminOrderDetailsDTO();
					
					dto.setOrderStatus(orderDetail.getOrderStatus());
					dto.setPackageQty(orderDetail.getPackageQty());
					dto.setServiceDate(orderDetail.getServiceDate());
					dto.setOrderId(orderDetail.getOrders().getOrderId());
					dto.setPackageTitle(orderDetail.getServicePackage().getPackageTitle());
					dto.setTotalAmount(orderDetail.getServicePackage().getPackagePrice()*orderDetail.getPackageQty());
					dto.setCustomerName(orderDetail.getOrders().getCustomer().getFirstName());
					dto.setCustomerMobileNo(orderDetail.getOrders().getCustomer().getMobileNo());
					dto.setPartnerName(orderDetail.getPartner().getFirstName());
					dto.setPartnerMobileNo(orderDetail.getPartner().getMobileNo());
					dto.setAddressLineOne(orderDetail.getOrders().getAddress().getAddressLineOne());
					dto.setAddressLineTwo(orderDetail.getOrders().getAddress().getAddressLineTwo());
					dto.setCity(orderDetail.getOrders().getAddress().getCity());
					dto.setCountry(orderDetail.getOrders().getAddress().getCountry());
					dto.setLandmark(orderDetail.getOrders().getAddress().getLandmark());
					dto.setState(orderDetail.getOrders().getAddress().getState());
					dto.setZipCode(orderDetail.getOrders().getAddress().getZipCode());
					
					return dto;})
				.collect(Collectors.toList());
		return orderList;
	}



}
