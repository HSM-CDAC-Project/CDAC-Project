package com.jobdone.controller;

import static org.springframework.http.MediaType.IMAGE_GIF_VALUE;
import static org.springframework.http.MediaType.IMAGE_JPEG_VALUE;
import static org.springframework.http.MediaType.IMAGE_PNG_VALUE;

import java.io.IOException;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.jobdone.dto.PartnerLoginDTO;
import com.jobdone.dto.PartnerLoginRespDTO;
import com.jobdone.dto.PartnerRegisterDTO;
import com.jobdone.dto.PasswordDTO;
import com.jobdone.dto.UpdateOrderStatusDTO;
import com.jobdone.dto.UpdatePartnerEmailDTO;
import com.jobdone.dto.UpdatePartnerMobileNoDTO;
import com.jobdone.security.JwtUtils;
import com.jobdone.service.OrderDetailsService;
import com.jobdone.service.PartnerImageHandlingService;
import com.jobdone.service.PartnerService;


@CrossOrigin(origins = "http://localhost:3000/", maxAge = 3600)

@RestController
@RequestMapping("/partner")
public class PartnerController {
	
	@Autowired
	private PartnerService partnerService;
	
	@Autowired
	private OrderDetailsService orderDetailsService;
	
	@Autowired
	private PartnerImageHandlingService partnerImgHandlingService;
	
	@Autowired
	private AuthenticationManager authMgr;
	
	@Autowired
	private JwtUtils jwtUtils;
	
	//partner register
	@PostMapping(value = "/register", consumes = {
			MediaType.MULTIPART_FORM_DATA_VALUE })
	public ResponseEntity<?> registerPartner(@RequestPart("profileImage") MultipartFile
			profileImage,@RequestPart("idImage") MultipartFile idImage, @RequestPart("partnerDTO") PartnerRegisterDTO partnerDTO)
			throws IOException {

		return ResponseEntity.status(HttpStatus.CREATED).body(partnerService.registerPartner(partnerDTO, profileImage, idImage));
	}
	
	@PutMapping("/updateEmail")
	public ResponseEntity<?> updatePartnerEmail(@RequestBody UpdatePartnerEmailDTO email){
		return ResponseEntity.ok().body(partnerService.updatePartnerEmailService(email));
	}
	
	@PutMapping("/updateMobileNo")
	public ResponseEntity<?> updatePartnerMobileNo(@RequestBody UpdatePartnerMobileNoDTO mobile){
		return ResponseEntity.ok().body(partnerService.updatePartnerMobileNoService(mobile));
	}
	
	@GetMapping("/details/{partnerId}")
	public ResponseEntity<?>getPartnerDetails(@PathVariable String partnerId){
		return ResponseEntity.ok().body(partnerService.getPartnerDetailsById(partnerId));
	}
	
	
	
	// partner pending orders
	@GetMapping("/assignedorders/{partnerId}")
	public ResponseEntity<?> getPartnerPendingOrders(@PathVariable String partnerId){
		return ResponseEntity.status(HttpStatus.OK).body(orderDetailsService.getPartnerOrderDetails(partnerId));
		}
	//Partner Login authentication
//	@PostMapping("/login")
//	public ResponseEntity<?> loginPartner (@RequestBody PartnerLoginDTO partnerLoginDTO){
//		return ResponseEntity.status(HttpStatus.OK).body(partnerService.authenticatePartner(partnerLoginDTO));
//	}
//	
	
	
	// order status update
	@PutMapping("/{detailsId}/updateStatus")
	public ResponseEntity<?> updateOrderStatus(@PathVariable Long detailsId, @RequestBody UpdateOrderStatusDTO statusDTO){
		return ResponseEntity.ok(partnerService	.updateOrderStatusServ(detailsId, statusDTO));
	}
	
	
	//partner image
	@GetMapping(value = "/image/{partnerId}", 
			produces = { IMAGE_GIF_VALUE, IMAGE_JPEG_VALUE, IMAGE_PNG_VALUE })
	public ResponseEntity<?> downloadImage(@PathVariable String partnerId) throws IOException {
		System.out.println("in partner ctlr");
		return ResponseEntity.ok(partnerImgHandlingService.serveProfileImage(partnerId));
	}
	
	
	// update password
	@PostMapping("/updatepassword/{partnerId}")
	public ResponseEntity<?> updatePassword(@PathVariable String partnerId, @RequestBody PasswordDTO passwordDTO){
	return ResponseEntity.status(HttpStatus.OK).body(partnerService.updatePassword(partnerId, passwordDTO));
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> authenticateUser(@RequestBody 
			@Valid PartnerLoginDTO request) {
		//create a token(implementation of Authentication i/f)
		//to store un verified user email n pwd
		UsernamePasswordAuthenticationToken token=new 
				UsernamePasswordAuthenticationToken(request.getEmail(), 
						request.getPassword());
		//invoke auth mgr's authenticate method;
		Authentication verifiedToken = authMgr.authenticate(token);
        String jwt = jwtUtils.generateJwtToken(verifiedToken);
        PartnerLoginRespDTO loginResponse = new PartnerLoginRespDTO(jwt, verifiedToken.getName());
        return ResponseEntity.ok(loginResponse);

	}
		
}

