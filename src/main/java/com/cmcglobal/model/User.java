package com.cmcglobal.model;

import java.util.Date;
import java.util.Set;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cascade;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column
    private Long id;

    @Column(name = "user_name")
    private String username;

    @Column
    private String password;

    @Column
    private String email;

    @Column
    private String phone;

    @Column
    private int status;

    @Column
    private String address;

    @Column
    private String photo;

    @Column
    private int is_confirmed;

    @Column
    private Date created_date;

    @Column
    private Long created_by;

    @Column
    private String created_prg;

    @Column
    private Date updated_date;

    @Column
    private Long updated_by;

    @Column
    private String updated_prg;

    @Column
    private int number_login_fail;

    @Column(columnDefinition = "integer default 0")
    private Date last_login_fail;

    @ManyToMany(fetch = FetchType.LAZY)
//    @JsonIgnore
    @JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles;

    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public User() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public int getIs_confirmed() {
        return is_confirmed;
    }

    public void setIs_confirmed(int is_confirmed) {
        this.is_confirmed = is_confirmed;
    }

    public Date getCreated_date() {
        return created_date;
    }

    public void setCreated_date(Date created_date) {
        this.created_date = created_date;
    }

    public Long getCreated_by() {
        return created_by;
    }

    public void setCreated_by(Long created_by) {
        this.created_by = created_by;
    }

    public String getCreated_prg() {
        return created_prg;
    }

    public void setCreated_prg(String created_prg) {
        this.created_prg = created_prg;
    }

    public Date getUpdated_date() {
        return updated_date;
    }

    public void setUpdated_date(Date updated_date) {
        this.updated_date = updated_date;
    }

    public Long getUpdated_by() {
        return updated_by;
    }

    public void setUpdated_by(Long updated_by) {
        this.updated_by = updated_by;
    }

    public String getUpdated_prg() {
        return updated_prg;
    }

    public void setUpdated_prg(String updated_prg) {
        this.updated_prg = updated_prg;
    }

    public int getNumber_login_fail() {
        return number_login_fail;
    }

    public void setNumber_login_fail(int number_login_fail) {
        this.number_login_fail = number_login_fail;
    }

    public Date getLast_login_fail() {
        return last_login_fail;
    }

    public void setLast_login_fail(Date last_login_fail) {
        this.last_login_fail = last_login_fail;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }
}
