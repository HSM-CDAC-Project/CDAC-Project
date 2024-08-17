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
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Entity
@Table(name="service")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString

public class Service extends BaseEntity{

	@Column(name="service_title", length = 50, nullable = false, unique = true)
	private String serviceTitle;

	@Column(name="service_description")
	private String serviceDescription;
	
	//service *<---->1 category bidirectional
	//child owning
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="category_id", nullable = false)
	private ServiceCategory category;
	
	//service 1<---->* packages bidirectional
	//parent non-owning
	@OneToMany(mappedBy = "service", cascade = CascadeType.ALL, orphanRemoval = true )
	private List<ServicePackage> packages = new ArrayList<>();
	
	public void addPackage(ServicePackage packages) {
		
		this.packages.add(packages);
		packages.setService(this);
	}
	
}
