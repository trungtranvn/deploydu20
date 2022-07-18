package com.cmcglobal.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.Predicate;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

@Component
public class UserSpecification extends BaseSpecification<User> {

    public Specification<User> getFilter(String value, String[] listFields) {

        List<Predicate> predicates = new ArrayList<>();
        return (root, query, cb) -> {

            for (String field : listFields) {
                predicates.add(userAttributeContains(field, value).toPredicate(root, query, cb));
            }
            return cb.or(predicates.toArray(new Predicate[0]));

        };

    }

    private Specification<User> userAttributeContains(String attribute, String value) {
        return (root, query, cb) -> {
            if (value == null) {
                return null;
            }

            return cb.like(cb.lower(root.get(attribute)), containsLowerCase(value));
        };
    }

}
