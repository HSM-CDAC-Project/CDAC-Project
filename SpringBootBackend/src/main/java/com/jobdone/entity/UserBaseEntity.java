package com.jobdone.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import javax.persistence.*;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@MappedSuperclass 
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString

public class UserBaseEntity {
		
	@CreationTimestamp 
	private LocalDate createdOn;

	@UpdateTimestamp 
	private LocalDateTime updatedOn;
	
	@Column(length = 30, nullable=false)
	private String firstName;
	
	@Column(length = 30)
	private String lastName;
	
	@Column(length = 30, unique = true, nullable=false)
	private String email;
	
	@Column(length = 15, unique = true, nullable=false)
	private String mobileNo;
	
	@Column(length = 100, nullable = false)
	private String password;
}
