package com.jobdone.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.jobdone.entity.Customer;
import com.jobdone.entity.Partner;
import com.jobdone.entity.ServiceTitle;
	
	
public interface PartnerRepository extends JpaRepository<Partner, String> {
	
	
	Optional<Partner> findByEmailAndPassword(String email, String password);
	Optional<Partner> findByEmail(String email);

	
	@Query("SELECT p from Partner p JOIN FETCH p.address a WHERE p.isApproved=TRUE and p.isDeleted=FALSE ")
	List<Partner> getAllApprovedPartner();
	
    List<Partner> findByServiceTitle(ServiceTitle serviceTitle);
    
	@Query("SELECT p from Partner p JOIN FETCH p.address a WHERE p.isApproved=FALSE and p.isDeleted=FALSE ")
	List<Partner> getAllUnApprovedPartner();
}
