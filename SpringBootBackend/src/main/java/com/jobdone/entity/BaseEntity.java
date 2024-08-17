package com.jobdone.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import javax.persistence.*;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


@MappedSuperclass 
@Getter
@Setter
@ToString

public class BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;	
	
	@CreationTimestamp 
	private LocalDate createdOn;

	@UpdateTimestamp 
	private LocalDateTime updatedOn;
}
