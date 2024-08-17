package com.jobdone.service;

import java.io.IOException;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.jobdone.custom_exception.AuthenticationException;
import com.jobdone.custom_exception.ResourceNotFoundException;
import com.jobdone.dto.PartnerLoginDTO;
import com.jobdone.dto.PartnerLoginRespDTO;
import com.jobdone.custom_exception.ApiException;
import com.jobdone.custom_exception.ResourceNotFoundException;
import com.jobdone.dto.ApiResponse;
import com.jobdone.dto.PartnerDetailsDTO;
import com.jobdone.dto.PartnerRegisterDTO;
import com.jobdone.dto.PasswordDTO;
import com.jobdone.dto.UpdateOrderStatusDTO;
import com.jobdone.dto.UpdatePartnerEmailDTO;
import com.jobdone.dto.UpdatePartnerMobileNoDTO;
import com.jobdone.entity.Customer;
import com.jobdone.entity.OrderDetails;
import com.jobdone.entity.OrderStatus;
import com.jobdone.entity.Partner;
import com.jobdone.entity.PartnerAddress;
import com.jobdone.repository.OrderDetailsRepository;
import com.jobdone.repository.PartnerRepository;
import com.jobdone.value_types.IdentityCard;

@Service
@Transactional
public class PartnerServiceImpl implements PartnerService {
	@Autowired
	private PartnerRepository partnerRepository;
	
	@Autowired
	private PartnerImageHandlingService imgHandlingService;
	
	@Autowired
	private OrderDetailsRepository orderDetailsRepository;
	
	@Autowired
	private ModelMapper mapper;
	
	@Autowired
    private PasswordEncoder passwordEncoder;
	
	@Override
	public PartnerDetailsDTO getPartnerDetailsById(String PartnerId) {
		// TODO Auto-generated method stub
		Partner partner = partnerRepository.findById(PartnerId)
				.orElseThrow(() -> new ResourceNotFoundException("invalid partner id"));
		return mapper.map(partner, PartnerDetailsDTO.class);
	}

	@Override
	public ApiResponse updatePartnerEmailService(UpdatePartnerEmailDTO updatePartnerEmailDTO) {
		// TODO Auto-generated method stub
		Partner partner = partnerRepository.findById(updatePartnerEmailDTO.getPartnerId())
				.orElseThrow(() -> new ResourceNotFoundException("invalid customer id!"));
				
				mapper.map(updatePartnerEmailDTO, partner);
				partnerRepository.save(partner);
			return new ApiResponse("Email id is updated");
	}

	@Override
	public ApiResponse updatePartnerMobileNoService(UpdatePartnerMobileNoDTO updatePartnerMobileNoDTO) {
		// TODO Auto-generated method stub
		Partner partner = partnerRepository.findById(updatePartnerMobileNoDTO.getPartnerId())
				.orElseThrow(() -> new ResourceNotFoundException("invalid customer id!"));
				
				mapper.map(updatePartnerMobileNoDTO, partner);
				partnerRepository.save(partner);
			return new ApiResponse("Mobile Number is updated");
	}

	@Override
	public PartnerRegisterDTO registerPartner(PartnerRegisterDTO partnerDTO, MultipartFile profileImage,
			MultipartFile idImage)throws IOException {
		
		//map all dto into entities
		Partner partner = mapper.map(partnerDTO, Partner.class);	    
	    IdentityCard card =mapper.map(partnerDTO, IdentityCard.class);
		PartnerAddress address = mapper.map(partnerDTO, PartnerAddress.class);
		
		
		String encodedPassword = passwordEncoder.encode(partnerDTO.getPassword());

				//set card details
				partner.setCard(card);
			    
				//set address id in partner
				partner.setAddress(address);
				
				imgHandlingService.uploadProfileImage(partner, profileImage);
				imgHandlingService.uploadIdImage(partner, idImage);
				
				partner.setPassword(encodedPassword);
				Partner savePartner = partnerRepository.save(partner);

				return mapper.map(savePartner, PartnerRegisterDTO.class);
	}

//	@Override
//	public PartnerLoginRespDTO authenticatePartner(PartnerLoginDTO loginDto) {
//		Partner partner = partnerRepository.findByEmailAndPassword(loginDto.getEmail(), loginDto.getPassword())
//				.orElseThrow(()-> new AuthenticationException("Invalid Email Or Password"));
//		return mapper.map(partner, PartnerLoginRespDTO.class);
//		
//		
//	}
	
	@Override
	public UpdateOrderStatusDTO updateOrderStatusServ(Long orderDetailsId ,UpdateOrderStatusDTO statusDTO) {
		OrderDetails details=orderDetailsRepository.findById(orderDetailsId)
		.orElseThrow(() -> new ResourceNotFoundException("order detail does not exist"));
		if(details.getOrderStatus() == OrderStatus.PENDING) {
			mapper.map(statusDTO, details);
			orderDetailsRepository.save(details);
			return mapper.map(details, UpdateOrderStatusDTO.class);

		}
		throw new ApiException("order is Not pending");
				
	}
	
	
	@Override
	public String updatePassword(String partnerId, PasswordDTO passwordDTO) {
		Partner existingPartner = partnerRepository.findById(partnerId)
				 .orElseThrow(() -> new ResourceNotFoundException("invalid partner id"));
		
		if((existingPartner.getPassword()).equals(passwordDTO.getOldPassword())) {
			existingPartner.setPassword(passwordDTO.getNewPassword());
			System.out.println("in service impl");
		partnerRepository.save(existingPartner);
		return "Password Updated";
		}
		return "Password update unsuccessful";
		
	}
}

