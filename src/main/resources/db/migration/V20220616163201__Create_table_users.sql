CREATE TABLE users(
    id bigint not null primary key,
    user_name varchar(100) unique not null,
    password varchar(500) not null,
    email varchar(100) unique not null, 
    phone varchar(13) unique not null,
    status int,
    address varchar(2000) not null,
    photo varchar(200),
    is_confirmed int,
    created_date timestamp,
    created_by bigint,
    created_prg varchar(100),
    updated_date timestamp,
    updated_by bigint,
    updated_prg varchar(100),
    number_login_fail int,
    last_login_fail timestamp
);

CREATE SEQUENCE users_id_seq START 1;