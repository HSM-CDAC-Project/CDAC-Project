package com.jobdone.controller;

import static com.jobdone.notifier.MailSender.sendEmail;
import static com.jobdone.notifiertemplate.ContentTemplate.mailBody;
import static com.jobdone.notifiertemplate.ContentTemplate.mailSubject;

import static org.springframework.http.MediaType.IMAGE_GIF_VALUE;
import static org.springframework.http.MediaType.IMAGE_JPEG_VALUE;
import static org.springframework.http.MediaType.IMAGE_PNG_VALUE;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.CancellationException;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.jobdone.dto.ApiResponse;
import com.jobdone.dto.CartItemDTO;
import com.jobdone.dto.CustomerAddressDTO;
import com.jobdone.dto.CustomerDTO;
import com.jobdone.dto.CustomerLoginDTO;
import com.jobdone.dto.CustomerLoginRespDTO;
import com.jobdone.dto.GetCartItemsDTO;
import com.jobdone.dto.PackageDetailsDTO;
import com.jobdone.dto.PasswordDTO;
import com.jobdone.dto.PlaceOrderRequestDTO;
import com.jobdone.dto.RatingValueDTO;
import com.jobdone.dto.RespRatingValueDTO;
import com.jobdone.entity.Cart;
import com.jobdone.entity.Customer;
import com.jobdone.security.JwtUtils;
import com.jobdone.dto.UpdateCustomerEmailDTO;
import com.jobdone.dto.UpdateCustomerMobileNoDTO;
import com.jobdone.service.CartService;
import com.jobdone.service.CustomerAddressService;
import com.jobdone.service.CustomerImageHandlingService;
import com.jobdone.service.CustomerService;
import com.jobdone.service.OrderDetailsService;
import com.jobdone.service.OrderService;

@CrossOrigin(origins = "http://localhost:3000/", maxAge = 3600)
@RestController
@RequestMapping("/customers")
public class CustomerController {
	
	@Autowired
	private JwtUtils jwtUtils;
	
	@Autowired
	private AuthenticationManager authMgr;
	
	@Autowired
	private CustomerService customerService;
	
	@Autowired
	private OrderDetailsService orderDetailsService;
	
	@Autowired
	private CustomerImageHandlingService imageHandlingService;
	
	@Autowired
	private CustomerAddressService customerAddressService;

	@Autowired
	private CartService cartService;
	
	@Autowired
	private OrderService orderService;
	
	@PostMapping("/register")
    public ResponseEntity<?> registerCustomer(@RequestBody CustomerDTO customerDTO) {
            customerService.registerCustomer(customerDTO);
            sendEmail(customerDTO.getEmail(), mailSubject(1), mailBody(1));

            return ResponseEntity.ok("customer registered successfully");
    }
	
//	@PostMapping("/login")
//	public ResponseEntity<?> loginCustomer(@RequestBody CustomerLoginDTO request) {
//		return ResponseEntity.ok(customerService.authenticateUser(request));
//	}
	
	
	@PutMapping("/updateEmail")
	public ResponseEntity<?> updateCustomerEmail(@RequestBody UpdateCustomerEmailDTO email){
		return ResponseEntity.ok().body(customerService.updateCustomerEmailService(email));
	}
	
	@PutMapping("/updateMobileNo")
	public ResponseEntity<?> updateCustomerMobileNo(@RequestBody UpdateCustomerMobileNoDTO mobile){
		return ResponseEntity.ok().body(customerService.updateCustomerMobileNoService(mobile));
	}
	
	@GetMapping("/details/{customerId}")
	public ResponseEntity<?>getCustomerDetails(@PathVariable String customerId){
		return ResponseEntity.ok(customerService.getCustomerDetailsById(customerId));
	}
	
	@GetMapping("/password/{customerId}")
	public ResponseEntity<?> getPasswordDetails(@PathVariable String customerId){
		String password = customerService.getPasswordDetailsById(customerId);
		return ResponseEntity.ok(password);
	}
	
	@PostMapping("/updatepassword/{customerId}")
	public ResponseEntity<?> updatePassword(@PathVariable String customerId, @RequestBody PasswordDTO passwordDTO){
		return ResponseEntity.status(HttpStatus.OK).body(customerService.updatePassword(customerId, passwordDTO));
	}
	
	
	@GetMapping("/{customerId}/orders")
	public ResponseEntity<?> getPackageDetails(@PathVariable String customerId){
		List<PackageDetailsDTO> packageDetails = orderDetailsService.getPackageDetailsByCustomerId(customerId);
		return ResponseEntity.ok(packageDetails);
	}
	
	
	@PostMapping("/addrating")
	public ResponseEntity<?> addRating(@RequestBody RatingValueDTO ratingValueDTO){
		orderDetailsService.addRatingToOrderDetail(ratingValueDTO);
		return ResponseEntity.ok("rating added successfully");
	}
	
	@GetMapping("/{orderDetailsId}")
	public ResponseEntity<?> getRating(@PathVariable Long orderDetailsId){
		RespRatingValueDTO ratingValueDTO = orderDetailsService.getRatingForOrderDetail(orderDetailsId);
		return ResponseEntity.ok(ratingValueDTO);
	}
	
	
	@PostMapping(value = "/image/{customerId}",
			consumes = "multipart/form-data")
	public ResponseEntity<?> uploadImage(@PathVariable String customerId, @RequestParam MultipartFile image)throws IOException {
		return ResponseEntity.status(HttpStatus.CREATED).
				body(imageHandlingService.uploadImage(customerId, image));
	}
	
	
	@GetMapping(value = "/image/{customerId}", 
			produces = { IMAGE_GIF_VALUE, IMAGE_JPEG_VALUE, IMAGE_PNG_VALUE })
	public ResponseEntity<?> downloadImage(@PathVariable String customerId) throws IOException {
		return ResponseEntity.ok(imageHandlingService.serveImage(customerId));
	}
	
	
	
	// Customer Address CRUD Methods
	
	// Get address by customer id
	@GetMapping("/{customerId}/address")
	public ResponseEntity<?> getAddressDetails(@PathVariable String customerId){
		
			return ResponseEntity.status(HttpStatus.OK).body(customerAddressService.getCustomerAddressById(customerId));
	}
	
	// delete address
	@DeleteMapping("/address/delete/{addressId}")
	public ResponseEntity<?> deleteAddressById(@PathVariable Long addressId){
			return ResponseEntity.status(HttpStatus.OK).body(customerAddressService.deleteAddressById(addressId));
	}
	
	// add address
	@PostMapping("/address/add/{customerId}")
	public ResponseEntity<?> addAddress(@RequestBody CustomerAddressDTO addressDTO, @PathVariable String customerId){
			return ResponseEntity.status(HttpStatus.OK).body(customerAddressService.addAddress(addressDTO, customerId));
	}
	
	// update address
	@PutMapping("/address/update/{addressId}")
	public ResponseEntity<?> updateAddress(@RequestBody CustomerAddressDTO addressDTO, @PathVariable Long addressId){
			return ResponseEntity.status(HttpStatus.OK).body(customerAddressService.updateAddressById(addressDTO, addressId));
	}
	
							// CART
	

	@PostMapping("/cart/add")
	public CartItemDTO addToCart(@RequestBody CartItemDTO cartItemDTO) {
        return cartService.addToCart(cartItemDTO);
    }
	
	@PostMapping("/cart/plus")
	public CartItemDTO addCartItems(@RequestBody CartItemDTO cartItemDTO) {
        return cartService.addCartItem(cartItemDTO);
    }
	
	@PostMapping("/cart/minus")
	public CartItemDTO removeCartItems(@RequestBody CartItemDTO cartItemDTO) {
        return cartService.removeCartItem(cartItemDTO);
    }
	
	
	@DeleteMapping("/cart/remove")
    public ResponseEntity<Void> removeFromCart(@RequestBody CartItemDTO cartItemDTO) {
        cartService.removeFromCart(cartItemDTO);
        return ResponseEntity.noContent().build(); // 204 No Content
    }
	
	@GetMapping("/cart/items")
    public ResponseEntity<?> getCartItems(
            @RequestParam String customerId) {
        List<GetCartItemsDTO> cartItems = cartService.getCartItems(customerId);
        return ResponseEntity.ok(cartItems); // 200 OK
    }
	
	

	  @PostMapping("/placeOrder")
	    public ApiResponse placeOrder(@RequestBody PlaceOrderRequestDTO placeOrderDTO) {
	        return orderService.placeOrder(placeOrderDTO);
	    }
	  
//		@PostMapping("/login")
//		public ResponseEntity<?> loginCustomer(@RequestBody CustomerLoginDTO request) {
//			return ResponseEntity.ok(customerService.authenticateUser(request));
//		}
	  
	  
		@PostMapping("/login")
		public ResponseEntity<?> authenticateUser(@RequestBody 
				@Valid CustomerLoginDTO request) {
			//create a token(implementation of Authentication i/f)
			//to store un verified user email n pwd
			UsernamePasswordAuthenticationToken token=new 
					UsernamePasswordAuthenticationToken(request.getEmail(), 
							request.getPassword());
			//invoke auth mgr's authenticate method;
			Authentication verifiedToken = authMgr.authenticate(token);
	        String jwt = jwtUtils.generateJwtToken(verifiedToken);
	        CustomerLoginRespDTO loginResponse = new CustomerLoginRespDTO(jwt, verifiedToken.getName());
            return ResponseEntity.ok(loginResponse);

		}
}
