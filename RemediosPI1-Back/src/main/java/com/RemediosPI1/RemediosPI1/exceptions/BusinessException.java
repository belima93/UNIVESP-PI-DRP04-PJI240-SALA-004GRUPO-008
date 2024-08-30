package com.RemediosPI1.RemediosPI1.exceptions;


public class BusinessException extends RuntimeException {
    private static final long serialVersionUID = 6496156834283221097L;

	public BusinessException(String message) {
        super(message);
    }
}
