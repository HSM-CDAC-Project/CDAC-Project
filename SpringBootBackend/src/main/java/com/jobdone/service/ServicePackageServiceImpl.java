package com.jobdone.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jobdone.dto.ServicePackageDetailsDTO;
import com.jobdone.entity.Rating;
import com.jobdone.repository.ServicePackageRepository;


@Service
@Transactional
public class ServicePackageServiceImpl implements ServicePackageService{
	
	@Autowired
	private ServicePackageRepository servicePackageRepository;
	
	
	@Override
	public List<ServicePackageDetailsDTO> getPackagesByService(Long serviceId) {
		List<ServicePackageDetailsDTO> packageList = servicePackageRepository.findPackageDetailsByServiceId(serviceId)
				.stream()
				.map(packageDetails ->{
					
					double avgRating1 = packageDetails.getRating()
							.stream()
							.mapToInt(Rating::getRating)
							.average()
							.orElse(0);
							
					
					ServicePackageDetailsDTO dto = new ServicePackageDetailsDTO();
					
					dto.setId(packageDetails.getId());
					dto.setPackageTitle(packageDetails.getPackageTitle());
					dto.setPackagePrice(packageDetails.getPackagePrice());
					dto.setAvgRating(avgRating1);
					dto.setTotalRatings(packageDetails.getRating().size());
					
					return dto;})
				.collect(Collectors.toList());
		return packageList;
	}
	
}
