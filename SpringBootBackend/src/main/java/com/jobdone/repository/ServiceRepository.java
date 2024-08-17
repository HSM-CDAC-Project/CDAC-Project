package com.jobdone.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobdone.entity.Service;

public interface ServiceRepository extends JpaRepository<Service, Long> {

	com.jobdone.entity.Service findByServiceTitle(String serviceTitle);

}
