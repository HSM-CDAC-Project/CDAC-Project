package com.jobdone.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jobdone.service.ServicePackageService;


@CrossOrigin (origins = "http://localhost:3000")
@RestController
@RequestMapping("/service")
public class ServicePackageContoller {
	
	@Autowired
	private ServicePackageService packageService;
	
	@GetMapping("/{serviceId}")
	public ResponseEntity<?> getServicePackages(@PathVariable Long serviceId){
		return ResponseEntity.status(HttpStatus.OK).body(packageService.getPackagesByService(serviceId));
	}
	
	
}
