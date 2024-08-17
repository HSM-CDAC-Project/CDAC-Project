package com.jobdone.service;


import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jobdone.custom_exception.AuthenticationException;
import com.jobdone.custom_exception.ResourceNotFoundException;
import com.jobdone.dto.ApiResponse;
import com.jobdone.dto.CustomerDTO;
import com.jobdone.dto.CustomerDetailsDTO;
import com.jobdone.dto.CustomerLoginDTO;
import com.jobdone.dto.CustomerLoginRespDTO;
import com.jobdone.dto.PasswordDTO;
import com.jobdone.entity.Customer;
import com.jobdone.repository.CustomerRepository;



import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jobdone.custom_exception.ResourceNotFoundException;
import com.jobdone.dto.CustomerDTO;
import com.jobdone.dto.UpdateCustomerEmailDTO;
import com.jobdone.dto.UpdateCustomerMobileNoDTO;
import com.jobdone.entity.Customer;
import com.jobdone.repository.CustomerRepository;

@Transactional
@Service
public class CustomerServiceImpl implements CustomerService {

	@Autowired
	private CustomerRepository customerRepository;
	
	@Autowired
	private ModelMapper mapper;
	
	 @Autowired
	    private PasswordEncoder passwordEncoder;
	
	
	@Override
	public CustomerDetailsDTO getCustomerDetailsById(String customerId) {
		 Customer customer = customerRepository.findById(customerId)
				 .orElseThrow(() -> new ResourceNotFoundException("invalid customer id"));
		 return mapper.map(customer, CustomerDetailsDTO.class);
	}
	
	
	@Override
	public Customer registerCustomer(CustomerDTO customerDTO) {
		String encodedPassword = passwordEncoder.encode(customerDTO.getPassword());
        Customer customer = mapper.map(customerDTO, Customer.class);
        customer.setPassword(encodedPassword);
        
        return customerRepository.save(customer);
       
    }


	@Override
	public String getPasswordDetailsById(String customerId) {
		 Customer customer = customerRepository.findById(customerId)
				 .orElseThrow(() -> new ResourceNotFoundException("invalid customer id"));
		return customer.getPassword();
	}

	@Override
	public String updatePassword(String customerId, PasswordDTO passwordDTO) {
		Customer existingCustomer = customerRepository.findById(customerId)
				 .orElseThrow(() -> new ResourceNotFoundException("invalid customer id"));
		
		if((existingCustomer.getPassword()).equals(passwordDTO.getOldPassword())) {
			existingCustomer.setPassword(passwordDTO.getNewPassword());
			customerRepository.save(existingCustomer);
			return "Password Updated";
		}
		return "Password update unsuccessful";
	}


//	@Override
//	public CustomerLoginRespDTO authenticateUser(CustomerLoginDTO request) {
//		Customer userEntity = customerRepository.findByEmailAndPassword(request.getEmail(), request.getPassword())
//				.orElseThrow(() -> new AuthenticationException("Invalid Email Or Password"));
//		// => valid login
//		CustomerLoginRespDTO responseDTO = mapper.map(userEntity, CustomerLoginRespDTO.class);
////	    responseDTO.setCustomerId(userEntity.getCustomerId());
//
//		return responseDTO;
//	}
	
	
	public ApiResponse updateCustomerEmailService(UpdateCustomerEmailDTO updateCustomerEmailDTO) {
			Customer customer = customerRepository.findById(updateCustomerEmailDTO.getCustomerId())
			.orElseThrow(() -> new ResourceNotFoundException("invalid customer id!"));
			
			mapper.map(updateCustomerEmailDTO, customer);
			customerRepository.save(customer);
		return new ApiResponse("Email id is updated");
	}


	@Override
	public ApiResponse updateCustomerMobileNoService(UpdateCustomerMobileNoDTO updateCustomerMobileNoDTO) {
		Customer customer = customerRepository.findById(updateCustomerMobileNoDTO.getCustomerId())
				.orElseThrow(() -> new ResourceNotFoundException("invalid customer id!"));
				
				mapper.map(updateCustomerMobileNoDTO, customer);
				customerRepository.save(customer);
			return new ApiResponse("Mobile Number is updated");
	}	
	
	
}
