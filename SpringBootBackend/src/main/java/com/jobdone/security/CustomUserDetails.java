package com.jobdone.security;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.jobdone.entity.Admin;
import com.jobdone.entity.Customer;
import com.jobdone.entity.Partner;

public class CustomUserDetails implements UserDetails {
    private Customer customer;
    private Partner partner;
    private Admin admin;
    private String userType; // "CUSTOMER" or "PARTNER"

    public CustomUserDetails(Customer customer) {
        this.customer = customer;
        this.userType = "CUSTOMER";
    }

    public CustomUserDetails(Partner partner) {
        this.partner = partner;
        this.userType = "PARTNER";
    }
    
    public CustomUserDetails(Admin admin) {
        this.admin = admin;
        this.userType = "ADMIN";
    }

    // Add the getUserType() method
    public String getUserType() {
        return this.userType;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if ("CUSTOMER".equals(userType)) {
            return List.of(new SimpleGrantedAuthority("ROLE_CUSTOMER"));
        } else if ("PARTNER".equals(userType)) {
            return List.of(new SimpleGrantedAuthority("ROLE_PARTNER"));
        }else if ("ADMIN".equals(userType)) {
            return List.of(new SimpleGrantedAuthority("ROLE_ADMIN"));
        }
        return List.of();
    }

    @Override
    public String getPassword() {
        if ("CUSTOMER".equals(userType)) {
            return customer.getPassword();
        } else if ("PARTNER".equals(userType)) {
            return partner.getPassword();
        }else if ("ADMIN".equals(userType)) {
            return admin.getPassword();
        }
        return null;
    }

//    @Override
//    public String getUsername() {
//        if ("CUSTOMER".equals(userType)) {
//            return customer.getEmail();
//        } else if ("PARTNER".equals(userType)) {
//            return partner.getEmail();
//        }else if ("ADMIN".equals(userType)) {
//            return admin.getEmail();
//        }
//        return null;
//    }
    
  @Override
    public String getUsername() {
        if ("CUSTOMER".equals(userType)) {
            return customer.getCustomerId();
        } else if ("PARTNER".equals(userType)) {
            return partner.getPartnerId();
        }else if ("ADMIN".equals(userType)) {
            return admin.getEmpId();
        }
        return null;
    }
    

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
