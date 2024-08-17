package com.jobdone.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.jobdone.dto.PasswordDTO;
import com.jobdone.custom_exception.ResourceNotFoundException;
import com.jobdone.custom_exception.AuthenticationException;
import com.jobdone.dto.ActiveOrdersDTO;
import com.jobdone.dto.ActiveOrdersPartnerDTO;
import com.jobdone.dto.AddPackageDTO;
import com.jobdone.dto.AdminLoginDTO;
import com.jobdone.dto.AdminLoginRespDTO;
import com.jobdone.dto.ApiResponse;
import com.jobdone.dto.CustomerAddressDTO;
import com.jobdone.dto.CustomerDetailsDTO;
import com.jobdone.dto.PackageDetailsDTO;
import com.jobdone.dto.PartnerDetailsDTO;
import com.jobdone.entity.Partner;
import com.jobdone.entity.ServiceCategory;
import com.jobdone.entity.ServicePackage;
import com.jobdone.notifiertemplate.OtpGenerator;
import com.jobdone.entity.Admin;
import com.jobdone.entity.OrderStatus;
import com.jobdone.repository.AdminRepository;
import com.jobdone.repository.OrderDetailsRepository;
import com.jobdone.repository.PartnerRepository;
import com.jobdone.repository.ServiceCategoryRepository;
import com.jobdone.repository.ServicePackageRepository;
import com.jobdone.repository.ServiceRepository;


@Service
@Transactional
public class AdminServiceImpl implements AdminService {
	
	@Autowired
	private AdminRepository adminRepository;

	@Autowired
	private OrderDetailsRepository orderDetailsRepository;
	
	@Autowired
	private PartnerRepository partnerRepository;
	
	@Autowired
	private ServiceCategoryRepository categoryRepository;
	
	@Autowired
	private ServicePackageRepository packageRepository;
	
	@Autowired
	private ServiceRepository serviceRepository;
	
	@Autowired
	private ModelMapper mapper;
	
	 public List<PartnerDetailsDTO> getAllApprovedPartnersList() {
	        List<Partner> partnerList = partnerRepository.getAllApprovedPartner();
	        return partnerList.stream()
	                .map(partner -> mapper.map(partner, PartnerDetailsDTO.class))
	                .collect(Collectors.toList());
	    }
	
	@Override
	public String updatePassword(String empId, PasswordDTO passwordDTO) {
		Admin existingAdmin = adminRepository.findById(empId)
				 .orElseThrow(() -> new ResourceNotFoundException("invalid empId"));
		
		if((existingAdmin.getPassword()).equals(passwordDTO.getOldPassword())) {
			existingAdmin.setPassword(passwordDTO.getNewPassword());
			adminRepository.save(existingAdmin);
		return "Password Updated";
		}
		return "Password update unsuccessful";
	}
	
//	@Override
//	public AdminLoginRespDTO authenticateUser(AdminLoginDTO request) {
//		Admin adminEntity = adminRepository.findByEmailAndPassword(request.getEmail(), request.getPassword())
//				.orElseThrow(() -> new AuthenticationException("Invalid Email Or Password"));
//
//		//getRandom generator is static method from OtpGenerator class
//		OtpGenerator og = new OtpGenerator();
//		String otp = og.getRandomNumber();
//		
//		// TO-DO -> store the otp in database then do the validation
//		
//		AdminLoginRespDTO respDTO = mapper.map(adminEntity, AdminLoginRespDTO.class);
//		respDTO.setEmpId(adminEntity.getEmpId());
//		respDTO.setOtp(otp);
//		respDTO.setStatus("success");
//		return respDTO;
//	}

	@Override
	public List<PartnerDetailsDTO> getAllUnApprovedPartnersList() {
		 List<Partner> partnerList = partnerRepository.getAllUnApprovedPartner();
	        
	        return partnerList.stream()
	                .map(partner -> mapper.map(partner, PartnerDetailsDTO.class))
	                .collect(Collectors.toList());
	}

	@Override
	public ApiResponse approvePartner(String partnerId) {
		Partner partner = partnerRepository.findById(partnerId)
				.orElseThrow(() -> new ResourceNotFoundException("invalid partner id"));
		
		partner.setApproved(true);
		return new ApiResponse("partner approved "+partnerId);
	}

	@Override
	public ApiResponse removePartner(String partnerId) {
		Partner partner = partnerRepository.findById(partnerId)
				.orElseThrow(() -> new ResourceNotFoundException("invalid partner id"));
		partner.setDeleted(true);
		return new ApiResponse("partner deleted "+partnerId);
	}
	
	@Override
	public List<ActiveOrdersDTO> getActiveOrderList() {
	    // Fetch orders with status PENDING or any other status you consider as "active"
	    return orderDetailsRepository.findByOrderStatus(OrderStatus.PENDING)
	        .stream()
	        .map(orderDetails -> {
	            ActiveOrdersDTO dto = new ActiveOrdersDTO();
	            dto.setOrderId(orderDetails.getOrders().getOrderId());
	            dto.setPackageTitle(orderDetails.getServicePackage().getPackageTitle());
	            dto.setPackageQty(orderDetails.getPackageQty());
	            dto.setTotalAmount(orderDetails.getServicePackage().getPackagePrice() * orderDetails.getPackageQty());
	            dto.setOrderDate(orderDetails.getOrders().getCreatedOn());
	            dto.setServiceDate(orderDetails.getServiceDate());
	            CustomerDetailsDTO customerDTO = mapper.map(orderDetails.getOrders().getCustomer(), CustomerDetailsDTO.class);
	            dto.setCustomer(customerDTO);

	            // Map and set the customer address
	            CustomerAddressDTO addressDTO = mapper.map(orderDetails.getOrders().getAddress(), CustomerAddressDTO.class);
	            dto.setAddress(addressDTO);

	            // Map and set the partner details
	            ActiveOrdersPartnerDTO partnerDTO = mapper.map(orderDetails.getPartner(), ActiveOrdersPartnerDTO.class);
	            dto.setPartner(partnerDTO);

	            return dto;
	            
	        })
	        .collect(Collectors.toList());
	}

	@Override
	public ApiResponse addServicePackage(AddPackageDTO packageDTO) {
		ServiceCategory category = categoryRepository.findByCategoryTitle(packageDTO.getCategoryTitle());
		com.jobdone.entity.Service service = serviceRepository.findByServiceTitle(packageDTO.getServiceTitle());
			ServicePackage packages = mapper.map(packageDTO,ServicePackage.class);

			packages.setPackageTitle(packageDTO.getPackageTitle());

			packages.setPackagePrice(packageDTO.getPackagePrice());

			service.addPackage(packages);

			packageRepository.save(packages);
				
		return new ApiResponse("Package added successfully!");

	
	}
	
}