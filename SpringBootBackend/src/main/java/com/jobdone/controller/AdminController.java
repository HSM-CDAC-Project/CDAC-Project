package com.jobdone.controller;

import static org.springframework.http.MediaType.IMAGE_GIF_VALUE;
import static org.springframework.http.MediaType.IMAGE_JPEG_VALUE;
import static org.springframework.http.MediaType.IMAGE_PNG_VALUE;
import static com.jobdone.notifier.MailSender.sendEmail;
import static com.jobdone.notifiertemplate.ContentTemplate.mailBody;
import static com.jobdone.notifiertemplate.ContentTemplate.mailSubject;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jobdone.dto.AddPackageDTO;
import com.jobdone.dto.AdminLoginDTO;
import com.jobdone.dto.AdminLoginRespDTO;
import com.jobdone.dto.CustomerLoginDTO;
import com.jobdone.dto.PartnerDetailsDTO;
import com.jobdone.dto.PartnerLoginDTO;
import com.jobdone.dto.PartnerLoginRespDTO;
import com.jobdone.dto.PasswordDTO;
import com.jobdone.notifiertemplate.OtpGenerator;
import com.jobdone.security.JwtUtils;
import com.jobdone.service.AdminService;
import com.jobdone.service.CustomerService;
import com.jobdone.service.OrderDetailsService;
import com.jobdone.service.PartnerImageHandlingService;


@CrossOrigin(origins = "http://localhost:3000/", maxAge = 3600)
@RestController
@RequestMapping("/admin")
public class AdminController {
	
	@Autowired
	private JwtUtils jwtUtils;
	
	@Autowired
	private AuthenticationManager authMgr;
	
	@Autowired
	private CustomerService customerService;
	
	@Autowired
	private OrderDetailsService orderDetailsService;
	
	@Autowired
	private AdminService adminService;
	
	@Autowired
	private PartnerImageHandlingService partnerImgHandlingService;
	

	
	//get all pending orders
	@GetMapping("/ActiveOrders")
	public ResponseEntity<?> AllActiveOrders(){
		return ResponseEntity.ok(adminService.getActiveOrderList());
	}
//	@GetMapping("/orderdetails")
//	public ResponseEntity<?> getPartnerPendingOrders(@RequestParam OrderStatus status){
//		return ResponseEntity.status(HttpStatus.OK).body(orderDetailsService.getPendingOrderDetails(status));
//	}
	
	//approved partner list
		@GetMapping("/partnerList")
		public ResponseEntity<?> partnerList(){
			return ResponseEntity.ok(adminService.getAllApprovedPartnersList());
		}
	
	//un-approved partner list
				@GetMapping("/partnerPendingList")
				public ResponseEntity<?> unApprovedPartnerList(){
					List<PartnerDetailsDTO> partnerDTO=adminService.getAllUnApprovedPartnersList();
					Map<String, Object> response = new HashMap<>();
				    response.put("status", "success");
				    response.put("data", partnerDTO);
					return ResponseEntity.status(HttpStatus.OK).body(response);
				}
	
	
	
				//approve the partner
				@PutMapping("/approve/{partnerId}")
				public ResponseEntity<?> partnerApproval(@PathVariable String partnerId){
					return ResponseEntity.ok(adminService.approvePartner(partnerId));
				}
	
				//delete partner
				@DeleteMapping("/delete/{partnerId}")
				public ResponseEntity<?> partnerRemoval(@PathVariable String partnerId){
					return ResponseEntity.ok(adminService.removePartner(partnerId));
				}
			
	
	//update password
	@PostMapping("/updatepassword/{empId}")
	public ResponseEntity<?> updatePassword(@PathVariable String empId, @RequestBody PasswordDTO passwordDTO){
		System.out.println("in controller");
	return ResponseEntity.status(HttpStatus.OK).body(adminService.updatePassword(empId, passwordDTO));
	}
		
	//parner image
	@GetMapping(value = "/image/{partnerId}", 
			produces = { IMAGE_GIF_VALUE, IMAGE_JPEG_VALUE, IMAGE_PNG_VALUE })
	public ResponseEntity<?> downloadImage(@PathVariable String partnerId) throws IOException {
		return ResponseEntity.ok(partnerImgHandlingService.serveIdImage(partnerId));
	}
	
	//
		@PostMapping("/addPackage")
		public ResponseEntity<?> addServicePackage(@RequestBody AddPackageDTO packageDTO){
			System.out.println("in0");
			return ResponseEntity.status(HttpStatus.OK).body(adminService.addServicePackage(packageDTO));
		}
		
		@PostMapping("/login")
		public ResponseEntity<?> authenticateUser(@RequestBody 
				@Valid AdminLoginDTO request) {
			//create a token(implementation of Authentication i/f)
			//to store un verified user email n pwd
			UsernamePasswordAuthenticationToken token=new 
					UsernamePasswordAuthenticationToken(request.getEmail(), 
							request.getPassword());
			//invoke auth mgr's authenticate method;
			Authentication verifiedToken = authMgr.authenticate(token);
	        String jwt = jwtUtils.generateJwtToken(verifiedToken);
	        OtpGenerator og = new OtpGenerator();
			String otp = og.getRandomNumber();
	        AdminLoginRespDTO loginResponse = new AdminLoginRespDTO(jwt, verifiedToken.getName(), otp);
	        
//	        sendEmail(verifiedToken.getName(), mailSubject(5), "your otp is for login is "+otp);

	        return ResponseEntity.ok(loginResponse);

		}
		
//		//login admin
//		@PostMapping("/login")
//		public ResponseEntity<?> loginAdmin(@RequestBody 
//				 AdminLoginDTO request) {
//			System.out.println("in sign in " + request);
//			
//			AdminLoginRespDTO respDTO =  adminService.authenticateUser(request);
//	        sendEmail(respDTO.getEmail(), mailSubject(5), "your otp is for login is "+respDTO.getOtp());
//				return ResponseEntity
//						.ok(respDTO);
//			
//		}

}


