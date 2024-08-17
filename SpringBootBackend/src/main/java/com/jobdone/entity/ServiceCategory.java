package com.jobdone.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="service_category")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString

public class ServiceCategory extends BaseEntity {
	
	@Column(name="category_title", length = 50, nullable = false, unique = true)
	private String categoryTitle;
	
	@Column(name="category_description")
	private String categoryDescription;
	
	//category 1<--->* service bidirectional
	//parent non-owning
	@OneToMany(mappedBy = "category", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Service> services = new ArrayList<Service>();
	
}
