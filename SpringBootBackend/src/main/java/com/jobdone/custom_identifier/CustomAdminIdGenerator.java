package com.jobdone.custom_identifier;

import java.io.Serializable;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;
import org.springframework.stereotype.Component;

@Component
public class CustomAdminIdGenerator implements IdentifierGenerator {
	@PersistenceContext
    private EntityManager entityManager;
	
	@Override
    public Serializable generate(SharedSessionContractImplementor session, Object obj) {
        String prefix = "E";
        String query = "SELECT a.emp_id FROM admin a WHERE a.emp_id LIKE 'E%' ORDER BY a.emp_id DESC";
        List<String> ids = entityManager.createQuery(query, String.class).setMaxResults(1).getResultList();
        int max = ids.stream()
                     .map(id -> id.replace(prefix, ""))
                     .mapToInt(Integer::parseInt)
                     .max()
                     .orElse(0);
        return prefix + String.format("%04d", max + 1);
    }
}
