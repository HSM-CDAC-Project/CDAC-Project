package com.jobdone.service;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

import com.jobdone.dto.ApiResponse;
import com.jobdone.entity.Customer;
import com.jobdone.entity.Partner;


public interface CustomerImageHandlingService {
	ApiResponse uploadImage(String customerId, MultipartFile image) throws IOException;
	byte[] serveImage(String customerId) throws IOException;
	

	
}
