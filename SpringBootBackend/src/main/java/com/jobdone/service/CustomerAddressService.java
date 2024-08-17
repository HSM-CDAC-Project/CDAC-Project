package com.jobdone.service;

import java.util.List;

import com.jobdone.dto.ApiResponse;
import com.jobdone.dto.CustomerAddressDTO;

public interface CustomerAddressService {
	List<CustomerAddressDTO> getCustomerAddressById (String customerId);
	ApiResponse deleteAddressById (Long addressId);
	ApiResponse addAddress (CustomerAddressDTO addressDto, String customerId);
	ApiResponse updateAddressById (CustomerAddressDTO addressDto, Long addressId);
}
