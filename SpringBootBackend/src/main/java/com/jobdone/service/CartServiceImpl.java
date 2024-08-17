	package com.jobdone.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jobdone.custom_exception.ResourceNotFoundException;
import com.jobdone.dto.CartItemDTO;
import com.jobdone.dto.GetCartItemsDTO;
import com.jobdone.entity.Cart;
import com.jobdone.entity.CartItem;
import com.jobdone.entity.Customer;
import com.jobdone.entity.ServicePackage;
import com.jobdone.repository.CartItemRepository;
import com.jobdone.repository.CartRepository;
import com.jobdone.repository.CustomerRepository;
import com.jobdone.repository.ServicePackageRepository;

@Service
@Transactional
public class CartServiceImpl implements CartService {
	
	    @Autowired
	    private CartRepository cartRepository;

	    @Autowired
	    private CartItemRepository cartItemRepository;

	    @Autowired
	    private CustomerRepository customerRepository;

	    @Autowired
	    private ServicePackageRepository servicePackageRepository;
	    
	    public CartItemDTO addToCart(CartItemDTO cartItemDTO) {
	        // Fetch Customer
	        Customer customer = customerRepository.findById(cartItemDTO.getCustomerId())
	                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

	        // Fetch ServicePackage
	        ServicePackage servicePackage = servicePackageRepository.findById(cartItemDTO.getPackageId())
	                .orElseThrow(() -> new ResourceNotFoundException("Service package not found"));

	        // Fetch or Create Cart
	        Cart cart = cartRepository.findByCustomer_CustomerId(cartItemDTO.getCustomerId());
	        if (cart == null) {
	            cart = new Cart();
	            cart.setCustomer(customer);
	        }

	        // Check if CartItem already exists for the given ServicePackage
	        CartItem existingCartItem = cart.getCartItems().stream()
	                .filter(item -> item.getServicePackage().getId().equals(cartItemDTO.getPackageId()))
	                .findFirst()
	                .orElse(null);

	        if (existingCartItem != null) {
	            // Update quantity if the CartItem already exists
	            existingCartItem.setQuantity(1);

	        } else {
	            // Create a new CartItem if it does not exist
	            CartItem newCartItem = new CartItem();
	            newCartItem.setServicePackage(servicePackage);
	            newCartItem.setQuantity(1);
	            newCartItem.setCart(cart);
	            cart.getCartItems().add(newCartItem);
	        }

	        // Save Cart
	        cart = cartRepository.save(cart);

	        // Prepare DTO Response
	        CartItemDTO responseDTO = new CartItemDTO();
	        responseDTO.setCustomerId(customer.getCustomerId());
	        responseDTO.setPackageId(servicePackage.getId());

	        // If updating existing CartItem, return updated quantity
	        if (existingCartItem != null) {
	            responseDTO.setQuantity(existingCartItem.getQuantity());
	        } else {
	            responseDTO.setQuantity(1);
	        }

	        return responseDTO;
	    }
	    
	    
	    public CartItemDTO addCartItem(CartItemDTO cartItemDTO) {
	        // Fetch Customer
	        Customer customer = customerRepository.findById(cartItemDTO.getCustomerId())
	                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

	        // Fetch ServicePackage
	        ServicePackage servicePackage = servicePackageRepository.findById(cartItemDTO.getPackageId())
	                .orElseThrow(() -> new ResourceNotFoundException("Service package not found"));

	        // Fetch or Create Cart
	        Cart cart = cartRepository.findByCustomer_CustomerId(cartItemDTO.getCustomerId());
	        if (cart == null) {
	            cart = new Cart();
	            cart.setCustomer(customer);
	        }

	        // Check if CartItem already exists for the given ServicePackage
	        CartItem existingCartItem = cart.getCartItems().stream()
	                .filter(item -> item.getServicePackage().getId().equals(cartItemDTO.getPackageId()))
	                .findFirst()
	                .orElse(null);

            // Update quantity if the CartItem already exists
            existingCartItem.setQuantity(existingCartItem.getQuantity() + 1);
	       

	        // Save Cart
	        cart = cartRepository.save(cart);

	        // Prepare DTO Response
	        CartItemDTO responseDTO = new CartItemDTO();
	        responseDTO.setCustomerId(customer.getCustomerId());
	        responseDTO.setPackageId(servicePackage.getId());

	        responseDTO.setQuantity(existingCartItem.getQuantity());

	        return responseDTO;
	    }
	    
	    public CartItemDTO removeCartItem(CartItemDTO cartItemDTO) {
	        // Fetch Customer
	        Customer customer = customerRepository.findById(cartItemDTO.getCustomerId())
	                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

	        // Fetch ServicePackage
	        ServicePackage servicePackage = servicePackageRepository.findById(cartItemDTO.getPackageId())
	                .orElseThrow(() -> new ResourceNotFoundException("Service package not found"));

	        // Fetch or Create Cart
	        Cart cart = cartRepository.findByCustomer_CustomerId(cartItemDTO.getCustomerId());
	        if (cart == null) {
	            cart = new Cart();
	            cart.setCustomer(customer);
	        }

	        // Check if CartItem already exists for the given ServicePackage
	        CartItem existingCartItem = cart.getCartItems().stream()
	                .filter(item -> item.getServicePackage().getId().equals(cartItemDTO.getPackageId()))
	                .findFirst()
	                .orElse(null);

            // Update quantity if the CartItem already exists
            existingCartItem.setQuantity(existingCartItem.getQuantity() - 1);

	       
	        // Save Cart
	        cart = cartRepository.save(cart);

	        // Prepare DTO Response
	        CartItemDTO responseDTO = new CartItemDTO();
	        responseDTO.setCustomerId(customer.getCustomerId());
	        responseDTO.setPackageId(servicePackage.getId());

	        // If updating existing CartItem, return updated quantity
	        responseDTO.setQuantity(existingCartItem.getQuantity());
	        

	        return responseDTO;
	    }

	    
	    public void removeFromCart(CartItemDTO cartItemDTO) {
	        // Fetch Customer
	        Customer customer = customerRepository.findById(cartItemDTO.getCustomerId())
	                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

	        // Fetch Cart
	        Cart cart = cartRepository.findByCustomer_CustomerId(cartItemDTO.getCustomerId());
	        if (cart == null) {
	            throw new ResourceNotFoundException("Cart not found for customer");
	        }

	        // Find and remove CartItem
	        CartItem cartItemToRemove = cart.getCartItems().stream()
	                .filter(item -> item.getServicePackage().getId().equals(cartItemDTO.getPackageId()))
	                .findFirst()
	                .orElseThrow(() -> new ResourceNotFoundException("CartItem not found"));

	        cart.getCartItems().remove(cartItemToRemove);

	        // Save updated Cart
	        cartRepository.save(cart);
	    }

	    
	    public List<GetCartItemsDTO> getCartItems(String customerId) {
	        // Fetch Customer
	        Customer customer = customerRepository.findById(customerId)
	                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

	        // Fetch Cart
	        Cart cart = cartRepository.findByCustomer_CustomerId(customerId);
	        if (cart == null) {
	            throw new ResourceNotFoundException("Cart not found for customer");
	        }

	        // Convert CartItems to DTOs
	        return cart.getCartItems().stream()
	                .map(cartItem -> {
	                	GetCartItemsDTO dto = new GetCartItemsDTO();
	                	dto.setCartId(cartItem.getCart().getId());
	                    dto.setPackageId(cartItem.getServicePackage().getId());
	                    dto.setPackageTitle(cartItem.getServicePackage().getPackageTitle());
	                    dto.setPackagePrice(cartItem.getServicePackage().getPackagePrice());
	                    dto.setQuantity(cartItem.getQuantity());
	                    dto.setTotalAmount(cartItem.getQuantity() * cartItem.getServicePackage().getPackagePrice());
	                    return dto;
	                })
	                .collect(Collectors.toList());
	    }


	    
	
}
