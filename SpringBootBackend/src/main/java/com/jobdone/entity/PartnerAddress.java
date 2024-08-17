package com.jobdone.entity;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="partner_address")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString

public class PartnerAddress extends BaseEntity {
	
//	@Column(name="house_no",length=20)
//	private String houseNo;
//	
//	@Column(length=30)
//	private String building;
//	
//	@Column(length=30)
//	private String area;
	
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
	
	
	
}
