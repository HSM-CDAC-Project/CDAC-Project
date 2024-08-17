package com.jobdone.notifier;

import java.util.Properties;

import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;


public class MailSender 
{
	public static void sendEmail(String to , String subject, String message) {
		//variableforgmailhost
		String host="smtp.gmail.com";
		
		//get the system properties
		Properties properties=	System.getProperties();
		//setting important information to properties object
		properties.put("mail.smtp.host", host);
		properties.put("mail.smtp.port","465");//port
		properties.put("mail.smtp.ssl.enable","true");
		properties.put("mail.smtp.auth","true");
	
		//step:1 to get the session object
		Session session=Session.getInstance(properties,new Authenticator() {

		@Override
			protected PasswordAuthentication getPasswordAuthentication() {	
				return new PasswordAuthentication("jobdone.notification@gmail.com","nehn wqyy eqhh vwnm");
			}
		});
		session.setDebug(false);
		//step:2 compose the message
		MimeMessage mymessage=new MimeMessage(session);
		//from email
		try {
			mymessage.setFrom("jobdone.notification@gmail.com");
			//add reciepent to message
			mymessage.addRecipient(Message.RecipientType.TO, new InternetAddress(to));
			
			//adding subject to message
			mymessage.setSubject(subject);
			//adding text to message
			mymessage.setText(message);
			//send
			//step3: send msg using transport class
			Transport.send(mymessage);
			
		} catch (MessagingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
