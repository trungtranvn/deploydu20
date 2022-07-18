CREATE TABLE roles(
    id bigint not null primary key,
    role_code varchar(100) unique not null,
    role_name varchar(100) not null,
    status int,
    created_date timestamp,
    created_by bigint,
    updated_date timestamp,
    updated_by bigint
);

CREATE SEQUENCE roles_id_seq START 1;