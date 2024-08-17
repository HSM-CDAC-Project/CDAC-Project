package com.jobdone.dto;

import com.jobdone.entity.OrderStatus;
import com.jobdone.entity.ServiceTitle;
import com.jobdone.value_types.CardType;

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
public class UpdateOrderStatusDTO {

	private OrderStatus orderStatus;
}
