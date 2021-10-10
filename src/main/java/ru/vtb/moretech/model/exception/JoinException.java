package ru.vtb.moretech.model.exception;

public class JoinException extends RuntimeException {
    public JoinException() {
        super("Exception while joining");
    }
}
