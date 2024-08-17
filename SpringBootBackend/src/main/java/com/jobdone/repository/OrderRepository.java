package com.jobdone.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobdone.entity.Order;

public interface OrderRepository extends JpaRepository<Order, String> {

	
}
