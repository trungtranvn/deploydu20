package com.cmcglobal.repo;

import com.cmcglobal.model.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.Modifying;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import java.util.Date;

@Repository
public interface UserRepository extends JpaRepository<User, Long>, JpaSpecificationExecutor<User> {
    Optional<User> findByUsername(String username);

    // Optional<User> addUser(User newUser);
    Optional<User> findByEmailAndUsername(String email, String username);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    @Transactional
    @Modifying
    @Query("update User u set u.password = ?2 where u.username = ?1")
    void updatePassword(String username, String password);

    @Transactional
    @Modifying
    @Query("update User u set u.last_login_fail = :localDate , u.number_login_fail = :numberLoginFail where u.username = :userName ")
    void updateLoginFailTime(@Param("userName") String userName, @Param("localDate") Date localDate,
            @Param("numberLoginFail") int numberLoginFail);
    boolean existsByPhone(String phone);
    
}
