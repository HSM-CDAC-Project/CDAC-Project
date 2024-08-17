package com.jobdone.service;

import java.io.File;
import java.io.IOException;

import static org.apache.commons.io.FileUtils.readFileToByteArray;
import static org.apache.commons.io.FileUtils.writeByteArrayToFile;

import javax.annotation.PostConstruct;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.jobdone.custom_exception.ResourceNotFoundException;
import com.jobdone.dto.ApiResponse;
import com.jobdone.entity.Customer;
import com.jobdone.entity.Partner;
import com.jobdone.repository.CustomerRepository;

@Service
@Transactional
public class CustomerImageHandlingServiceImpl implements CustomerImageHandlingService {

	//to store path of file in database and store image in folder
	@Value("${file.upload.location}")
	private String uploadFolder;

	
	@Autowired
	private CustomerRepository customerRepository;
	
	//to store image file path in database and store image file in a folder
	
	@PostConstruct
	public void init() throws IOException {
		// chk if folder exists --yes --continue
		File folder = new File(uploadFolder);
		if (folder.exists()) {
		} else {
			// no --create a folder
			folder.mkdir();
		}
	}
	
	//to handle customer images
	@Override
	public ApiResponse uploadImage(String customerId, MultipartFile image) throws IOException {
		Customer customer = customerRepository.findById(customerId)
				 .orElseThrow(() -> new ResourceNotFoundException("invalid customer id"));
		String path = uploadFolder.concat(image.getOriginalFilename());
		writeByteArrayToFile(new File(path), image.getBytes());
		customer.setImagePath(path);
		return new ApiResponse("Image file uploaded successfully for emp id " + customerId);
	}
	
	@Override
	public byte[] serveImage(String customerId) throws IOException {
		Customer customer = customerRepository.findById(customerId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid emp ID!!!!"));
        // Return image from DB
		String path = customer.getImagePath();

        if (path != null) {
			return readFileToByteArray(new File(path));
        } else {
            throw new ResourceNotFoundException("Image not yet assigned for customer ID: " + customerId);
        }
    }
	
	

	
}
