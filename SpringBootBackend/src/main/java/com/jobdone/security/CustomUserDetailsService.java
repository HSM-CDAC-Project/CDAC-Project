package com.jobdone.security;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jobdone.entity.Admin;
import com.jobdone.entity.Customer;
import com.jobdone.entity.Partner;
import com.jobdone.repository.AdminRepository;
import com.jobdone.repository.CustomerRepository;
import com.jobdone.repository.PartnerRepository;


@Service
@Transactional
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private CustomerRepository customerRepo;

    @Autowired
    private PartnerRepository partnerRepo;
    
    @Autowired
    private AdminRepository adminRepo;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // First try to find a customer
        Customer customer = customerRepo.findByEmail(email).orElse(null);
        if (customer != null) {
            return new CustomUserDetails(customer);
        }
        
        // If no customer found, try to find a partner
        Partner partner = partnerRepo.findByEmail(email).orElse(null);
        if(partner != null) {
        	return new CustomUserDetails(partner);
        }
        
        Admin admin = adminRepo.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return new CustomUserDetails(admin);
    }
}

