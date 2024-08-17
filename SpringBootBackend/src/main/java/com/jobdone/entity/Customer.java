package com.jobdone.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.PrePersist;
import javax.persistence.Table;
import org.hibernate.annotations.Parameter;


import org.hibernate.annotations.GenericGenerator;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="customer")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString

public class Customer extends UserBaseEntity {
	
		@Id
		@GeneratedValue(generator="customer_id")
		@GenericGenerator(name="customer_id", strategy = "com.jobdone.custom_identifier.CustomCustomerIdGenerator")
		@Column(name="customer_id", length = 5)
	    private String customerId;
	   

		
	
	
	// customer 1---->* Address bidirectional
	@OneToMany(mappedBy = "customer",cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
	private List<CustomerAddress> address = new ArrayList<>();
	
//	@Lob
//	@Column(name="customer_image")
//	private byte[] customerImage;
	
	private String imagePath;


	//customer 1<---->* order bidirectional
	@OneToMany(mappedBy = "customer",cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Order> orders = new ArrayList<>();
	
	@OneToOne(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true)
	private Cart carts;
}