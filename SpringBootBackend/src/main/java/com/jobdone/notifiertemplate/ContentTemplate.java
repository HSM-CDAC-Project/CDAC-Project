package com.jobdone.notifiertemplate;

import com.jobdone.notifiertemplate.OtpGenerator;

public class ContentTemplate {

	public static String mailSubject(int contentId) {
		
		switch(contentId)
		{
		case 1 : return "Dear User! Welcome to Jobdone!!!";
				
		case 2 : return "Dear Partner! Welcome to Jobdone!!!";
		
		case 3 : return "Dear Partner! Welcome to Jobdone!!!";
				
		case 4 : return "Order booked Successfully!!!";
		
		case 5 : return "admin otp";

		
		default : return "Jobdone Notification";
		}
	}
	
	public static String mailBody(int contentId) {
		switch(contentId)
		{
		case 1 : return "Dear User! You are successfully registered with us. "
				+ "Feel free to check out our services...";
				
		case 2 : return "Dear Partner! Thank you for registering with us. "
				+ "We will review all your details and inform you of the next steps soon...";
				
		case 3 : return "Dear Partner! Welcome aboard. Your details have been successfully verified. "
				+ "We hope for you to have a great experience with us. "
				+ "Your services will be initiated soon and you'll soon start receiving notifications for your next steps !!! ";
		
		case 4 : return " Thanks for choosing our services! Your order has been placed successfully!!! ";
				
		default : return "Thanks for choosing our services!!!";
		}
		
	}
	
	
}
