create database todo_app_db;

use database todo_app_db;

create table todo_item (

    id varchar(199) not null primary key,
    title varchar(149) not null,
    description varchar(199) not null,
    profile_id varchar(128) not null,
    status varchar(99) not null  default 'active',
    created_by varchar(128) not null default 'system',
    created_on timestamp not null default now(),
    updated_by varchar(128) not null default 'system',
    updated_on timestamp not null default now()

);

alter table todo_item add constraint todo_item_fk_profile_id foreign key (profile_id) references profile(id);

create table profile (

    id varchar(199) not null primary key,
    name varchar(199) not null,
    email varchar(199) not null,
    password varchar(199) not null,
    status varchar(32) not null default 'NA',
    active boolean not null default true,
    created_by varchar(128) not null default 'system',
    created_on timestamp not null default now(),
    updated_by varchar(128) not null default 'system',
    updated_on timestamp not null default now()

);