package com.jobdone.custom_identifier;

import java.io.Serializable;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;


import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;


public class CustomPartnerIdGenerator implements IdentifierGenerator {

	@Override
	public Serializable generate(SharedSessionContractImplementor session, Object object) throws HibernateException {
	    String prefix = "P";
	    Connection connection = session.connection();
	    try {
	    	System.out.println("in id generator");
	        Statement statement=connection.createStatement();

	        ResultSet rs=statement.executeQuery("select count(partner_id) as Id from partner");

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
	}}
