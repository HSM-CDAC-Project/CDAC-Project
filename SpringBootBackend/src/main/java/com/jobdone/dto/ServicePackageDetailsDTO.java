package com.jobdone.dto;

import java.util.ArrayList;
import java.util.List;

import com.jobdone.entity.Rating;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;




@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString(callSuper = true)
public class ServicePackageDetailsDTO {
	private Long id;
	
	private String packageTitle;
	
	private double packagePrice;
	
	//package 1<--->* rating bidirectional
//	@OneToMany(mappedBy = "servicePackage", cascade = CascadeType.ALL, orphanRemoval = true)
//	private List<Rating> rating = new ArrayList<>();
	
	private double avgRating;
	private int totalRatings;
}
