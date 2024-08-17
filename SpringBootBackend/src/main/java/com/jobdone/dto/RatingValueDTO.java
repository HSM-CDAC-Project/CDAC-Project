package com.jobdone.dto;


import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

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
public class RatingValueDTO extends BaseDTO {
	
	private int rating;
	
	@JsonProperty(access = Access.WRITE_ONLY)
	private Long servicePackageId;
	
	@JsonProperty(access = Access.WRITE_ONLY)
	private Long orderDetailsId;
}
