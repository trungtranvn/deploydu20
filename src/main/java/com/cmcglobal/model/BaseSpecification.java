package com.cmcglobal.model;

import org.springframework.data.jpa.domain.Specification;

public abstract class BaseSpecification<T> {
    private final String wildcard = "%";

    protected String containsLowerCase(String searchField) {
        return wildcard + searchField.toLowerCase() + wildcard;
    }
}
