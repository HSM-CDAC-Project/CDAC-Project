package com.jobdone.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobdone.entity.Customer;

public interface CustomerRepository extends JpaRepository<Customer, String> {
	Optional<Customer> findByEmailAndPassword(String email, String password);
	
	Optional<Customer> findByEmail(String email);


}
