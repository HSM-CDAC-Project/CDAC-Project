package com.jobdone.custom_identifier;

import java.io.Serializable;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;
import org.springframework.stereotype.Component;

@Component
public class CustomOrderIdGenerator implements IdentifierGenerator {

	@Override
	public Serializable generate(SharedSessionContractImplementor session, Object object) throws HibernateException {
	    String prefix = "ORD";
	    Connection connection = session.connection();
	    try {
	    	System.out.println("in id generator");
	        Statement statement=connection.createStatement();

	        ResultSet rs=statement.executeQuery("select count(order_id) as Id from orders");

	        if(rs.next())
	        {
	            int id=rs.getInt(1)+1;
	            String generatedId = prefix + String.format("%06d", id);
	            return generatedId;
	        }
	    } catch (SQLException e) {
	        e.printStackTrace();
	    }


		return null;
	}
}
