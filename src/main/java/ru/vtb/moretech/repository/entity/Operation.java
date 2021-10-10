package ru.vtb.moretech.repository.entity;

import lombok.Data;

import java.util.Map;

@Data
public class Operation {
    private final OperationType type;

    private final Map<String, Object> query;
}
