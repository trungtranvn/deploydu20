package com.cmcglobal.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cmcglobal.model.Function;
import com.cmcglobal.model.Role;
import com.cmcglobal.model.User;
import com.cmcglobal.repo.UserRepository;

@Service
public class UserDetailsSecurityService /* implements UserDetailsService */ {
    @Autowired
    private UserRepository userRepository;

    // @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not present"));
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), true,
                true, true, true, getAuthorities(user.getRoles()));
    }

    private Collection<? extends GrantedAuthority> getAuthorities(Collection<Role> roles) {
        return getGrantedAuthorities(getPrivileges(roles));
    }

    public void createUser(User user) {
        userRepository.save(user);
    }

    private Set<String> getPrivileges(Collection<Role> roles) {

        Set<String> privileges = new HashSet<>();
        Set<Function> collection = new HashSet<>();
        for (Role role : roles) {
            // privileges.add(role.getRoleId());
            collection.addAll(role.getFunctions());
        }
        for (Function item : collection) {
            privileges.add(item.getFunctionId());
        }
        return privileges;
    }

    private List<GrantedAuthority> getGrantedAuthorities(Set<String> functions) {
        List<GrantedAuthority> authorities = new ArrayList<>();
        for (String function : functions) {
            authorities.add(new SimpleGrantedAuthority(function));
        }
        return authorities;
    }
}