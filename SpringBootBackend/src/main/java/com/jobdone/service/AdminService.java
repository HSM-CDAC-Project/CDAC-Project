package com.jobdone.service;

import java.util.List;

import com.jobdone.dto.ActiveOrdersDTO;
import com.jobdone.dto.AddPackageDTO;
import com.jobdone.dto.AdminLoginDTO;
import com.jobdone.dto.AdminLoginRespDTO;
import com.jobdone.dto.ApiResponse;
import com.jobdone.dto.PartnerDetailsDTO;
import com.jobdone.dto.PasswordDTO;

public interface AdminService {

	List<PartnerDetailsDTO> getAllApprovedPartnersList();
	String updatePassword(String adminId, PasswordDTO passwordDTO);
//	AdminLoginRespDTO authenticateUser(AdminLoginDTO request);
	List<PartnerDetailsDTO> getAllUnApprovedPartnersList();
	ApiResponse approvePartner(String partnerId);
	ApiResponse removePartner(String partnerId);
	List<ActiveOrdersDTO> getActiveOrderList();
	ApiResponse addServicePackage(AddPackageDTO packageDTO);

}
