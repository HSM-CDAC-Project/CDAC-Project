package com.jobdone.custom_identifier;

import java.io.Serializable;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;


public class CustomCustomerIdGenerator implements IdentifierGenerator {

	@Override
	public Serializable generate(SharedSessionContractImplementor session, Object object) throws HibernateException {
	    String prefix = "C";
	    Connection connection = session.connection();
	    try {
	        Statement statement=connection.createStatement();

	        ResultSet rs=statement.executeQuery("select count(customer_id) as Id from customer");

	        if(rs.next())
	        {
	            int id=rs.getInt(1)+1;
	            String generatedId = prefix + String.format("%04d", id);
	            return generatedId;
	        }
	    } catch (SQLException e) {
	        e.printStackTrace();
	    }


		return null;
	}
    
}
