package com.jobdone.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jobdone.custom_exception.ResourceNotFoundException;
import com.jobdone.dto.ApiResponse;
import com.jobdone.dto.CustomerAddressDTO;
import com.jobdone.entity.Customer;
import com.jobdone.entity.CustomerAddress;
import com.jobdone.repository.CustomerAddressDetailsRepository;
import com.jobdone.repository.CustomerRepository;

@Service
@Transactional
public class CustomerAddressServiceImpl implements CustomerAddressService{
	
	@Autowired
	private CustomerAddressDetailsRepository customerAddressRepository;
	@Autowired
	private CustomerRepository customerRepository;
	@Autowired
	private ModelMapper modelMapper;

	
	@Override
	public List<CustomerAddressDTO> getCustomerAddressById(String customerId) {
		List<CustomerAddress> addressList = customerAddressRepository.findByCustomerCustomerId(customerId);
		return addressList.stream().map(customerAddress ->
					modelMapper.map(customerAddress, CustomerAddressDTO.class))
				.collect(Collectors.toList());
	}

	@Override
	public ApiResponse deleteAddressById(Long addressId) {
		customerAddressRepository.deleteById(addressId);
		return new ApiResponse("Address Deleted Successfully");
	}

	@Override
	public ApiResponse addAddress(CustomerAddressDTO addressDto, String customerId) {
		Customer customer = customerRepository.findById(customerId).orElseThrow(()-> new RuntimeException("Customer not found"));
		
		CustomerAddress address = modelMapper.map(addressDto, CustomerAddress.class);
		address.setCustomer(customer);
		
		customerAddressRepository.save(address);
		
		return new ApiResponse("Address Added Successfully");
	}

	@Override
	public ApiResponse updateAddressById(CustomerAddressDTO addressDto, Long addressId) {
		CustomerAddress address = customerAddressRepository.findById(addressId).orElseThrow(()-> new ResourceNotFoundException("No resource present"));
		modelMapper.map(addressDto, address);
		customerAddressRepository.save(address);
		
		return new ApiResponse("Address Updated Successfully");
	}
	
	
	
	
	
	
	
	
	
}
