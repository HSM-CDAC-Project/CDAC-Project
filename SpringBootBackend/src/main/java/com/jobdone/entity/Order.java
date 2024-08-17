package com.jobdone.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;
import org.hibernate.annotations.UpdateTimestamp;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Entity
@Table(name="orders")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Order {
	
	@Id

	@GeneratedValue(generator="order_id")
	@GenericGenerator(name="order_id", strategy = "com.jobdone.custom_identifier.CustomOrderIdGenerator")
	@Column(name="order_id", length = 9)
    private String orderId;
	
	@CreationTimestamp
	@Column(name="order_date", nullable = false)
	private LocalDate createdOn;

	@UpdateTimestamp 
	private LocalDateTime updatedOn;
		
	//order *<----->1 customer bidirectional
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="customer_id", nullable = false)
	private Customer customer;
	
	
	
	//Order 1---->1 customer address unidirectional
	@OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinColumn(name = "address_id", nullable = false)
	private CustomerAddress address;
	
	//order 1<--->* order details bidirectional
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "orders", orphanRemoval = true)
	private List<OrderDetails> orderDetails = new ArrayList<>();
	

	@Column(name="order_amount")
	private double orderAmount;
}
