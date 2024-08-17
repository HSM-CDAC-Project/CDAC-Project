package com.jobdone.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.jobdone.entity.ServicePackage;

public interface ServicePackageRepository extends JpaRepository<ServicePackage, Long>{
	
	@Query("SELECT sp FROM ServicePackage sp "
			+ "JOIN FETCH sp.service s "
			+ "LEFT JOIN FETCH sp.rating r "
			+ "WHERE s.id = :serviceId")
	List<ServicePackage> findPackageDetailsByServiceId(@Param("serviceId") Long serviceId);

	
}


//@Query("SELECT sp FROM ServicePackage sp " +
//        "JOIN FETCH sp.service s " +
//        "LEFT JOIN FETCH sp.rating r " +
//        "WHERE s.id = :serviceId")
// List<ServicePackage> findPackageDetailsByServiceId(@Param("serviceId") Long serviceId);