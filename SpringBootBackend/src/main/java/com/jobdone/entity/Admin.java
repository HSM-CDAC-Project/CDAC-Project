package com.jobdone.entity;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

import org.hibernate.annotations.Parameter;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="admin")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString



public class Admin extends UserBaseEntity {
		@Id
		@GeneratedValue(strategy = GenerationType.IDENTITY, generator="admin-id-generator")
		@GenericGenerator(name="admin-id-generator", strategy = "com.jobdone.custom_identifier.CustomAdminIdGenerator",
		parameters = {
				@Parameter(name="prefix", value="E")
		}
	)
		@Column(name="emp_id", length = 5)
		private String empId;
}
