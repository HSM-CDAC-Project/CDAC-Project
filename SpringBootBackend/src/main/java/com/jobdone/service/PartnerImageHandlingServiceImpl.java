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
import com.jobdone.entity.Partner;
import com.jobdone.repository.PartnerRepository;

@Service
@Transactional
public class PartnerImageHandlingServiceImpl implements PartnerImageHandlingService {

	//to store path of file in database and store image in folder
	@Value("${file.upload.location}")
	private String uploadFolder;

	@Autowired
	private PartnerRepository partnerRepository;	
	//to store image file path in database and store image file in a folder
	
	@PostConstruct
	public void init() throws IOException {
		// chk if folder exists --yes --continue
		File folder = new File(uploadFolder);
		if (folder.exists()) {
			System.out.println("folder already exist");
		} else {
			// no --create a folder
			folder.mkdir();
		}
	}
	
	//to handle partner profile image
		
	@Override
	public void uploadProfileImage(Partner partner, MultipartFile image) throws IOException {
		System.out.println("in upload profile image");
		// store the image on server side folder
		String path = uploadFolder.concat(image.getOriginalFilename());
		
		// Use FileUtils method : writeByte[] --> File
		writeByteArrayToFile(new File(path), image.getBytes());
		
		// set image path
		partner.setPartnerImagePath(path);
		System.out.println("out upload profile image");

	}
	
	@Override
	public byte[] serveProfileImage(String partnerId) throws IOException {
		System.out.println("in image service");
		Partner partner = partnerRepository.findById(partnerId)
				.orElseThrow(() -> new ResourceNotFoundException("partner id not found!"));
        // Return image from DB
		String path = partner.getPartnerImagePath();
		System.out.println("in1 image service");

        if (path != null) {
			return readFileToByteArray(new File(path));
        } else {
            throw new ResourceNotFoundException("Image not yet assigned for partner ID: " + partnerId);
        }
        
        
        
        

    }
	
	
	//to handle id image

	@Override
	public void uploadIdImage(Partner partner, MultipartFile image) throws IOException {
		System.out.println("in upload id image");

		// store the image on server side folder
		String path = uploadFolder.concat(image.getOriginalFilename());
		System.out.println("in upload id1 image");

		// Use FileUtils method : writeByte[] --> File
		writeByteArrayToFile(new File(path), image.getBytes());
		System.out.println("in upload id2 image");

		// set image path
		partner.getCard().setIdImagePath(path);
		System.out.println("out upload id image");

	}
	
	@Override
	public byte[] serveIdImage(String partnerId) throws IOException {
		Partner partner = partnerRepository.findById(partnerId)
				.orElseThrow(() -> new ResourceNotFoundException("partner id not found!"));
        // Return image from DB
		String path = partner.getCard().getIdImagePath();

        if (path != null) {
			return readFileToByteArray(new File(path));
        } else {
            throw new ResourceNotFoundException("id card Image not yet assigned for partner ID: " + partnerId);
        }
    }	
	
}

