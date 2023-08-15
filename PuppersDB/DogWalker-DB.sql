CREATE  DATABASE IF NOT EXISTS `dogwalker-db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
use `dogwalker-db`;

CREATE TABLE IF NOT EXISTS franjaHoraria(
	franja_id INT AUTO_INCREMENT PRIMARY KEY,
    start_minute SMALLINT,
    end_minute SMALLINT,
    convertido VARCHAR(11) unique
);

CREATE TABLE IF NOT EXISTS area(
	area_id INT AUTO_INCREMENT PRIMARY KEY,
    area_name VARCHAR(255) unique
);

CREATE TABLE IF NOT EXISTS location(
	location_id INT AUTO_INCREMENT,
    location_name VARCHAR(255) unique,
    area_id INT,
    PRIMARY KEY (location_id, area_id),
    FOREIGN KEY (area_id)
		references area (area_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS clientes (
	client_tel VARCHAR(12) ,
    client_ID VARCHAR(10) PRIMARY KEY,
    client_name VARCHAR(128) NOT NULL,  ####
    start_date DATE,
    client_email VARCHAR(254),
    client_user VARCHAR(18) NOT NULL,
    client_password VARCHAR(64), 
    client_salt VARCHAR(20),
    location_id int,
    address_link VARCHAR(510),
	foreign key FK2 (location_id)
		references location (location_id)
);

ALTER TABLE clientes ADD INDEX idx_client_ID (client_ID);

CREATE TABLE IF NOT EXISTS paseadores(
	walker_ID VARCHAR(10) not null primary key,
    walker_name VARCHAR(128) NOT NULL,
    start_date DATE,
    walker_tel VARCHAR(12) NOT NULL,
    walker_user VARCHAR(18) NOT NULL,
    walker_password VARCHAR(64) NOT NULL,
    walker_address VARCHAR(254),
    walker_linkaddress VARCHAR(510),
    walker_photoURL VARCHAR(510),
    walker_bloodtype VARCHAR(3),
    walker_salt VARCHAR(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS mascotas (
    pet_token int AUTO_INCREMENT,
    client_ID VARCHAR(10),
    pet_name VARCHAR(255) NOT NULL,
    service VARCHAR(2) DEFAULT '5P',
    renovation_date DATE default '2023-12-31',
    pet_breed VARCHAR(255) DEFAULT 'mixed',
    PRIMARY KEY (pet_token),
    FOREIGN KEY (client_ID)
        REFERENCES clientes (client_ID)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);


create table if not exists servicio(
	servicio_ID int auto_increment,
	pet_token int,
    walker_ID VARCHAR(10),
    franja_id int,
    primary key (servicio_ID, pet_token, walker_ID, franja_ID),
    foreign key fk1 (pet_token)
		references mascotas (pet_token)
        on update cascade
        on delete cascade,
	foreign key fk2 (walker_ID)
		references paseadores (walker_ID)
        on update cascade
        on delete cascade,
	foreign key fk3 (franja_ID)
		references franjaHoraria (franja_ID)
        on update cascade
        on delete cascade
);
/*
DELIMITER $$
CREATE TRIGGER walker_delete BEFORE DELETE ON servicio
  FOR EACH ROW BEGIN
    UPDATE servicio SET servicio.walker_ID = '0000000000' WHERE walker_ID = OLD.walker_ID;
  END $$
DELIMITER ;
*/
create table if not exists paseo(
    paseo_ID int auto_increment primary key,
    walker_ID VARCHAR(10),
    servicio_ID int,
    start_date datetime,
    end_date datetime,
    evidenceURL VARCHAR(510),
	foreign key fk2 (walker_ID)
		references paseadores (walker_ID)
        on update cascade
        on delete cascade,
	foreign key fk3 (servicio_ID)
		references servicio (servicio_ID)
);

CREATE TABLE IF NOT EXISTS admin(
	admin_username VARCHAR(18) PRIMARY KEY,
    admin_password VARCHAR(64),
    admin_salt VARCHAR(20)
);
