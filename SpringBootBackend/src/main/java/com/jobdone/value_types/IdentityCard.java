package com.jobdone.value_types;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Lob;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Embeddable
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString

public class IdentityCard {
	@Column(name = "card_no", length = 20, unique = true, nullable = false)
	private String cardNumber;
	
	@Enumerated(EnumType.STRING)
	@Column(name="card_type", length = 20, nullable = false)
	private CardType cardType;


	
	//OR to set image path in folder
	private String idImagePath;
}
