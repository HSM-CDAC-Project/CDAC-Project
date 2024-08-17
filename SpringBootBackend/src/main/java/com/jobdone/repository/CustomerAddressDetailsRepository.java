package com.jobdone.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobdone.entity.CustomerAddress;

public interface CustomerAddressDetailsRepository extends JpaRepository<CustomerAddress, Long>{
	List<CustomerAddress> findByCustomerCustomerId (String customerId);
}
