package com.jobdone.service;

import java.util.List;

import com.jobdone.dto.CartItemDTO;
import com.jobdone.dto.GetCartItemsDTO;
import com.jobdone.entity.Cart;

public interface CartService {

    public CartItemDTO addToCart(CartItemDTO cartItemDTO);
    public void removeFromCart(CartItemDTO cartItemDTO);

    public List<GetCartItemsDTO> getCartItems(String customerId);


    public CartItemDTO addCartItem(CartItemDTO cartItemDTO);

    public CartItemDTO removeCartItem(CartItemDTO cartItemDTO);

}
