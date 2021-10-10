package ru.vtb.moretech.model.exception;

public class FieldNotFoundException extends RuntimeException {
    public FieldNotFoundException() {
        super("Field not found");
    }
}
