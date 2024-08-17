package com.jobdone.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="rating")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode(callSuper = false)
public class Rating extends BaseEntity{
	
	@Column(name="rating")
	private int rating;
	
	//rating 1<---->1 order details bidirectional
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="orderDetails_id", nullable = false, unique=true)
	private OrderDetails ordersDetails;
	
	//rating *<---->1 service_package bidirectional
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="package_id", nullable = false)
	private ServicePackage servicePackage;
	
	
}
