package com.jobdone.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="service_package")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ServicePackage extends BaseEntity {

	@Column(name="package_title", length = 50, nullable = false, unique = true)
	private String packageTitle;
	
	@Column(name="package_price")
	private double packagePrice;
	
	//package *<--->1 service bidirectional
	//child owning
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="service_id", nullable = false)
	private Service service;
	
	//package 1<--->* rating bidirectional
	@OneToMany(mappedBy = "servicePackage", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Rating> rating = new ArrayList<>();
	
	// package 1<--->* cartItems bidirectional
    @OneToMany(mappedBy = "servicePackage", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CartItem> cartItems = new ArrayList<>();
    
    
}
