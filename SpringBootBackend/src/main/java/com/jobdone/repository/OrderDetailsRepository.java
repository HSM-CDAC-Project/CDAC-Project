package com.jobdone.repository;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.jobdone.dto.PartnerDetailsDTO;
import com.jobdone.entity.OrderDetails;
import com.jobdone.entity.OrderStatus;
import com.jobdone.entity.Partner;

public interface OrderDetailsRepository extends JpaRepository<OrderDetails, Long>{
	
	@Query("SELECT od FROM OrderDetails od "
			+ "JOIN FETCH od.servicePackage sp "
			+ "JOIN FETCH od.orders o "
			+ "JOIN FETCH o.customer c "
			+ "left join fetch od.rating r "
			+ "WHERE c.customerId = :customerId")
	List<OrderDetails> findOrderDetailsWithPackagesByCustomerId(@Param("customerId") String customerId);
	
	@Query("SELECT od FROM OrderDetails od "
			+ "JOIN FETCH od.servicePackage sp "
			+ "JOIN FETCH od.orders o "
			+ "JOIN FETCH o.customer c "
			+ "JOIN FETCH o.address a "
			+ "JOIN FETCH od.partner p "
			+ "WHERE p.partnerId = :partnerId "
			+ "AND od.orderStatus = 'PENDING'")
	List<OrderDetails> findOrderStatusByPartnerId( @Param("partnerId")String partnerId);
			
		
	
	
	@Query("SELECT od FROM OrderDetails od "
			+ "JOIN FETCH od.servicePackage sp "
			+ "JOIN FETCH od.orders o "
			+ "JOIN FETCH o.customer c "
			+ "JOIN FETCH o.address a "
			+ "JOIN FETCH od.partner p "
			+ "WHERE od.orderStatus = :status")
	List<OrderDetails> findOrderByStatusPending(@Param("status")OrderStatus status);
	
//	List<OrderDetails> findByOrderStatusAndPartnerPartnerId(OrderStatus status, @Param("partnerId")String partnerId);
	
//	List<OrderDetails> findByOrdersCustomerCustomerId(String customerId);
	
	@Query("SELECT COUNT(od) FROM OrderDetails od "
			+ "WHERE od.partner = :partner "
			+ "AND od.serviceDate = :serviceDate "
			+ "AND od.orderStatus = 'PENDING'")
    long countPendingRequestsByPartnerAndServiceDate(@Param("partner") Partner partner, @Param("serviceDate") LocalDate serviceDate);


    List<OrderDetails> findByOrderStatus(OrderStatus status);

}
