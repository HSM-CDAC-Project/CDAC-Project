package com.jobdone.service;

import java.util.List;

import com.jobdone.dto.ServicePackageDetailsDTO;

public interface ServicePackageService {
	List<ServicePackageDetailsDTO> getPackagesByService (Long serviceId);
}
