package com.jobdone.service;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

import com.jobdone.dto.ApiResponse;
import com.jobdone.dto.PartnerDetailsDTO;
import com.jobdone.dto.PartnerLoginDTO;
import com.jobdone.dto.PartnerLoginRespDTO;
import com.jobdone.dto.PartnerRegisterDTO;
import com.jobdone.dto.PasswordDTO;
import com.jobdone.dto.UpdateOrderStatusDTO;
import com.jobdone.dto.UpdatePartnerEmailDTO;
import com.jobdone.dto.UpdatePartnerMobileNoDTO;

public interface PartnerService {
	PartnerDetailsDTO getPartnerDetailsById(String PartnerId);
	ApiResponse updatePartnerEmailService(UpdatePartnerEmailDTO updatePartnerEmailDTO);
	ApiResponse updatePartnerMobileNoService(UpdatePartnerMobileNoDTO updatePartnerMobileNoDTO);
	String updatePassword(String partnerId, PasswordDTO passwordDTO);
	PartnerRegisterDTO registerPartner(PartnerRegisterDTO partnerDTO, MultipartFile partnerImage, MultipartFile idImage) throws IOException;
//	PartnerLoginRespDTO authenticatePartner (PartnerLoginDTO loginDto);
	UpdateOrderStatusDTO updateOrderStatusServ(Long orderDetailsId ,UpdateOrderStatusDTO statusDTO);
}
