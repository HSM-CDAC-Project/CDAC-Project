package com.jobdone.custom_exception;

public class ResourceNotFoundException extends RuntimeException {
public ResourceNotFoundException(String mesg) {
	super(mesg);
}
}
