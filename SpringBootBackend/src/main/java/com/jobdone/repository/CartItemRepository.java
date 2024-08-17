package com.jobdone.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobdone.entity.Cart;
import com.jobdone.entity.CartItem;
import com.jobdone.entity.ServicePackage;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    CartItem findByCartAndServicePackage(Cart cart, ServicePackage servicePackage);

}
