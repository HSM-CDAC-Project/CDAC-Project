package com.jobdone.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.jobdone.value_types.IdentityCard;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="partner")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString

public class Partner extends UserBaseEntity {
	@Id
	@GeneratedValue(generator="partner_id")
	@GenericGenerator(name="partner_id", strategy = "com.jobdone.custom_identifier.CustomPartnerIdGenerator")
	@Column(name="partner_id", length = 5)
    private String partnerId;
	  
	 @Column(name="is_deleted", columnDefinition = "boolean default false")
	 private boolean isDeleted;
	 
	 @Column(name="is_approved", columnDefinition = "boolean default false")
	 private boolean isApproved;

	
	
	// Partner 1---->1 Address unidirectional
	@OneToOne(cascade = CascadeType.ALL,fetch = FetchType.LAZY)
	@JoinColumn(name = "address_id")
	private PartnerAddress address;
	
	// service title only for partner
	@Enumerated(EnumType.STRING)
	@Column(name="service_title", length = 50)
	private ServiceTitle serviceTitle;
	
	// User 1--->1 IdentityCard unidirectional
	// composite value type
	// optional annotation
	@Embedded
	private IdentityCard card = new IdentityCard();
	
	private String partnerImagePath;
	
	//partner 1<---->* partner details bidirectional
	@OneToMany(mappedBy = "partner", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<OrderDetails> orderDetails = new ArrayList<>();
		
	
	//helper method to add address
	public void addAddress(PartnerAddress address) {
            this.address = address;
        }
	
}
