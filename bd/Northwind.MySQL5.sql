
DROP DATABASE IF EXISTS northwind;

CREATE DATABASE IF NOT EXISTS northwind;

USE northwind;

CREATE TABLE `user` (
  `idlogin` INT NOT NULL AUTO_INCREMENT,
  `userName` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `senha` VARCHAR(40) NOT NULL,
  `fullname` VARCHAR(45) NULL,

  PRIMARY KEY (`idlogin`));

TRUNCATE TABLE user;
INSERT INTO user(userName, email, senha,fullname) VALUES ('kildare','kildarealves@outlook.com','12345678','kildare alves');
