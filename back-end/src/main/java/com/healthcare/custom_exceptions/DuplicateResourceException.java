package com.healthcare.custom_exceptions;

@SuppressWarnings("serial")
public class DuplicateResourceException extends RuntimeException {

    public DuplicateResourceException(String message) {
        super(message);
    }
}
