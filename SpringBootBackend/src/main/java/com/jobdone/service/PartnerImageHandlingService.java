package com.jobdone.service;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;


import com.jobdone.entity.Partner;


public interface PartnerImageHandlingService {
	

	void uploadProfileImage(Partner partner, MultipartFile image) throws IOException;

	byte[] serveProfileImage(String partnerId) throws IOException;

	void uploadIdImage(Partner partner, MultipartFile image) throws IOException;

	byte[] serveIdImage(String partnerId) throws IOException;

}
