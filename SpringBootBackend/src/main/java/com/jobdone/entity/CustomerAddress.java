package com.jobdone.entity;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
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
@Table(name="customer_address")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString

public class CustomerAddress extends BaseEntity {
	
	@Column(name="add_line_one", length=100)
	private String addressLineOne;
	
	@Column(name="add_line_two", length=100)
	private String addressLineTwo;
	
	@Column(length=20, nullable = false)
	private String city;
	
	@Column(length=20 , nullable = false)
	private String state;
	
	@Column(length=20 , nullable = false)
	private String country;
	
	@Column(length=20,name="zip_code", nullable = false)
	private String zipCode;
	
	@Column(length=50)
	private String landmark;
		



	//address *<----->1 customer bidirectional
		@ManyToOne(fetch = FetchType.LAZY)
		@JoinColumn(name="customer_id", nullable = false)
		private Customer customer;
	
	
}
