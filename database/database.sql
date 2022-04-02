create table users(
    id_user serial,
    name_user character varying,
    email_user character varying,
	password_user character varying,
	verified_user boolean,
    status_user character varying,
    tokenup_user character varying,
    img_profile character varying,
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


//----------------------esto es la idea para canal de las conexiones con socket y contact 
create table channels(
id_channel serial,
integrantes integer[],
CONSTRAINT pk_canals PRIMARY KEY (id_channel))


create table contact(
id_user_contact serial,
id_user integer,
id_contact integer,
CONSTRAINT pk_user_contact PRIMARY KEY (id_user_contact),
CONSTRAINT fk_user FOREIGN KEY (id_user)
    REFERENCES users (id_user) MATCH SIMPLE
    ON UPDATE NO ACTION ON DELETE CASCADE,
CONSTRAINT fk_contact FOREIGN KEY (id_contact)
    REFERENCES users (id_user) MATCH SIMPLE
    ON UPDATE NO ACTION ON DELETE CASCADE
)

//----------------------create History

create table history (
	id_history serial, 
	id_channel integer, 
	id_author integer, 
	message_history character varying,
	date_history timestamp without time zone,
	CONSTRAINT pk_history PRIMARY KEY (id_history),
	CONSTRAINT fk_channel FOREIGN KEY (id_channel)
    REFERENCES channels (id_channel) MATCH SIMPLE
    ON UPDATE NO ACTION ON DELETE CASCADE,
	CONSTRAINT fk_author FOREIGN KEY (id_author)
    REFERENCES users (id_user) MATCH SIMPLE
    ON UPDATE NO ACTION ON DELETE CASCADE
)