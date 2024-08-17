package com.jobdone.entity;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="order_details")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
public class OrderDetails extends BaseEntity {
	
	
	@Column(name="package_qty", nullable = false)
	private int packageQty;
	
	@Column(name ="service_date", nullable = false)
	private LocalDate serviceDate;
	
	@Enumerated(EnumType.STRING)
	@Column(name = "order_status", length = 10)
	private OrderStatus orderStatus;
	
	//order details *<---->1 order bidirectional
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "order_id", nullable = false)
	private Order orders;
	
	//Order details *<---->1 partner bidirectional
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="partner_id", nullable = false)
	private Partner partner;
	
	//order details *---->1 package unidirectional
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="package_id", nullable = false)
	private ServicePackage servicePackage;
	
	//order_details 1<---->1 rating bidirectional
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="rating_id")
	private Rating rating;
	
	
	// Helper method to add rating
    public void addRating(Rating rating) {
        if (this.rating == null) {
            this.rating = rating;
        } else {
            throw new IllegalStateException("Rating already exists for this order detail.");
        }
    }
	
    
	
	
}
