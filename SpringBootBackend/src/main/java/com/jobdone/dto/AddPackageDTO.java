	package com.jobdone.dto;
	
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
	public class AddPackageDTO {
	
		private String categoryTitle;
		private String serviceTitle;
		private String packageTitle;
		private double packagePrice;
		
	}
