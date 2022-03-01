DROP DATABASE IF EXISTS test;
CREATE DATABASE test;
USE test;

DROP TABLE IF EXISTS users;
CREATE TABLE users (
    uname VARCHAR(20) NOT NULL PRIMARY KEY,
    paswd VARCHAR(20) NOT NULL
);

INSERT INTO users (uname,passwd)
VALUES
	('test','test'),
    ('ferenc','asd123');

DELIMITER $$

DROP PROCEDURE IF EXISTS sp_AuthenticateUser $$
CREATE PROCEDURE sp_AuthenticateUser(IN uname VARCHAR(20), IN passw VARCHAR(20), OUT res INT)
BEGIN
	SELECT  @res_count := COUNT(*)  
    	FROM users
        WHERE uname LIKE uname AND passwd LIKE passw;
     
    IF (@res_count = 1) THEN 
    	SET res = 0;
    ELSE 
    	SET res = 1;
    END IF;
END $$