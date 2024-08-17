package com.jobdone.service;

import com.jobdone.dto.ApiResponse;
import com.jobdone.dto.CustomerDTO;
import com.jobdone.dto.CustomerDetailsDTO;
import com.jobdone.dto.PasswordDTO;
import com.jobdone.dto.CustomerLoginDTO;
import com.jobdone.dto.CustomerLoginRespDTO;
import com.jobdone.dto.UpdateCustomerEmailDTO;
import com.jobdone.dto.UpdateCustomerMobileNoDTO;
import com.jobdone.entity.Customer;

public interface CustomerService {

	Customer registerCustomer(CustomerDTO customerDTO);


	CustomerDetailsDTO getCustomerDetailsById(String customerId);
	
	String getPasswordDetailsById(String customerId);
	
	String updatePassword(String customerId, PasswordDTO passwordDTO);
	
//	CustomerLoginRespDTO authenticateUser(CustomerLoginDTO request);

	
	ApiResponse updateCustomerEmailService(UpdateCustomerEmailDTO updateCustomerEmailDTO);
	
	ApiResponse updateCustomerMobileNoService(UpdateCustomerMobileNoDTO updateCustomerMobileNoDTO);


}
