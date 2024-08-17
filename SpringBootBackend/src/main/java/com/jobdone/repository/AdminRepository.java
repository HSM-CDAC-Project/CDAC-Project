package com.jobdone.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobdone.entity.Admin;
import com.jobdone.entity.Customer;

public interface AdminRepository extends JpaRepository<Admin, String> {

	Optional<Admin> findByEmailAndPassword(String email, String password);

	Optional<Admin> findByEmail(String email);

}
