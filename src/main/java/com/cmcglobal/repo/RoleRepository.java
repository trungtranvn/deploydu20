package com.cmcglobal.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cmcglobal.model.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, String> {

    Object findByRolename(String string);

}
