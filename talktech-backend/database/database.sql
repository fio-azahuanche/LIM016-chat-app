create table users(
    id_user serial,
    name_user character varying,
    email_user character varying,
	password_user character varying,
	verified_user boolean,
    status_user character varying,
    CONSTRAINT pk_user PRIMARY KEY (id_user)
)

create table canal(
id_canal character varying,
name_canal character varying,
CONSTRAINT pk_canal PRIMARY KEY (id_canal))


create table user_canal(
id_user_canal character varying,
id_user character varying,
id_canal character varying,
CONSTRAINT pk_user_canal PRIMARY KEY (id_user_canal),
CONSTRAINT fk_user FOREIGN KEY (id_user)
    REFERENCES users (id_user) MATCH SIMPLE
    ON UPDATE NO ACTION ON DELETE CASCADE,
CONSTRAINT fk_canal FOREIGN KEY (id_canal)
    REFERENCES canal (id_canal) MATCH SIMPLE
    ON UPDATE NO ACTION ON DELETE CASCADE
);