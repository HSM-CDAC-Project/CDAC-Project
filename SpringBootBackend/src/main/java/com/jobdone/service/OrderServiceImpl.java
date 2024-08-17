package com.jobdone.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jobdone.custom_exception.ResourceNotFoundException;
import com.jobdone.dto.ApiResponse;
import com.jobdone.dto.GetCartItemsDTO;
import com.jobdone.dto.PlaceOrderRequestDTO;
import com.jobdone.entity.Cart;
import com.jobdone.entity.CartItem;
import com.jobdone.entity.Customer;
import com.jobdone.entity.CustomerAddress;
import com.jobdone.entity.Order;
import com.jobdone.entity.OrderDetails;
import com.jobdone.entity.OrderStatus;
import com.jobdone.entity.Partner;
import com.jobdone.entity.ServicePackage;
import com.jobdone.entity.ServiceTitle;
import com.jobdone.repository.CartRepository;
import com.jobdone.repository.CustomerAddressDetailsRepository;
import com.jobdone.repository.CustomerRepository;
import com.jobdone.repository.OrderDetailsRepository;
import com.jobdone.repository.OrderRepository;
import com.jobdone.repository.PartnerRepository;
import com.jobdone.repository.ServicePackageRepository;

@Service
@Transactional
public class OrderServiceImpl implements OrderService {

	 @Autowired
	    private CartRepository cartRepository;

	    @Autowired
	    private OrderRepository orderRepository;

	    @Autowired
	    private CustomerRepository customerRepository;

	    @Autowired
	    private OrderDetailsRepository orderDetailsRepository;
	    
	    @Autowired
	    private ServicePackageRepository servicePackageRepository;

	    @Autowired
	    private PartnerRepository partnerRepository;
	    
	    @Autowired
	    private CustomerAddressDetailsRepository addressRepository;


	    @Override
	    public ApiResponse placeOrder(PlaceOrderRequestDTO placeOrderRequest) {
	        // Fetch customer address
	        CustomerAddress address = addressRepository.findById(placeOrderRequest.getAddressId())
	                .orElseThrow(() -> new ResourceNotFoundException("Address not found"));

	        // Fetch cart
	        Cart cart = cartRepository.findById(placeOrderRequest.getCartId())
	                .orElseThrow(() -> new ResourceNotFoundException("Cart not found"));

	        // Create new order
	        Order order = new Order();
	        order.setCustomer(cart.getCustomer());
	        order.setAddress(address);
	        // Do not set serviceDate on the order, since it's part of OrderDetails
	        double totalAmount = 0.0;

	        // Save the order first
	        orderRepository.save(order);

	        for (PlaceOrderRequestDTO.CartItemRequestDTO cartItemDTO : placeOrderRequest.getCartItems()) {
	            ServicePackage servicePackage = servicePackageRepository.findById(cartItemDTO.getPackageId())
	                    .orElseThrow(() -> new ResourceNotFoundException("ServicePackage not found"));

	            OrderDetails orderDetails = new OrderDetails();
	            orderDetails.setServicePackage(servicePackage);
	            orderDetails.setPackageQty(cartItemDTO.getQuantity());
	            orderDetails.setServiceDate(placeOrderRequest.getServiceDate()); // Set serviceDate on OrderDetails
	            orderDetails.setOrderStatus(OrderStatus.PENDING);
	            orderDetails.setOrders(order);  // Set the saved Order

	            // Convert service title from string to enum
	            String serviceTitleString = servicePackage.getService().getServiceTitle();
	            ServiceTitle serviceTitle;
	            try {
	                serviceTitle = ServiceTitle.valueOf(serviceTitleString);
	            } catch (IllegalArgumentException e) {
	                throw new RuntimeException("Invalid service title: " + serviceTitleString);
	            }

	            // Partner assignment logic
	            List<Partner> availablePartners = partnerRepository.findByServiceTitle(serviceTitle);
	            Partner assignedPartner = null;

	            for (Partner partner : availablePartners) {
	                long pendingRequests = orderDetailsRepository.countPendingRequestsByPartnerAndServiceDate(partner, placeOrderRequest.getServiceDate());

	                if (pendingRequests < 3) {
	                    assignedPartner = partner;
	                    break;
	                }
	            }

	            if (assignedPartner == null) {
	                throw new RuntimeException("All available partners are at full capacity for the selected service date.");
	            }

	            orderDetails.setPartner(assignedPartner);

	            // Save order details
	            orderDetailsRepository.save(orderDetails);

	            totalAmount += cartItemDTO.getPackagePrice() * cartItemDTO.getQuantity();
	        }

	        // Update the total amount in the order
	        order.setOrderAmount(totalAmount);
	        orderRepository.save(order);
	        
	     // Clear the cart
	        cart.getCartItems().clear(); // Remove all cart items
	        cartRepository.save(cart); // Save the empty cart or just clear it depending on your requirement


	        return new ApiResponse("Order placed successfully");
	    }

}
