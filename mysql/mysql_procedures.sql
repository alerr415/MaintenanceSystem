-- ----------------------------------------
-- Log in procedure
-- ----------------------------------------
DROP PROCEDURE IF EXISTS Bejelentkezes;
DELIMITER //

CREATE PROCEDURE Bejelentkezes (IN username VARCHAR(50), 
								IN pass VARCHAR(20), 
                                OUT qualification VARCHAR(50),
								OUT maint_specialist_id INT,
                                OUT resultcode INT)
BEGIN
    DECLARE van INT;
    SELECT COUNT(*) INTO van
        FROM Felhasznalo
        WHERE Felhasznalonev = username AND Jelszo = pass;
    IF van = 1 THEN
		-- Van olyan felhasznalo
		SELECT Szerepkor INTO qualification
			FROM Felhasznalo
			WHERE Felhasznalonev = username AND Jelszo = pass;
		SELECT Karbantarto_ID INTO maint_specialist_id
			FROM Karbantarto
			WHERE Felhasznalo_ID = (SELECT Felhasznalo_ID
									FROM Felhasznalo
									WHERE Felhasznalonev = username AND Jelszo = pass);
		SET resultcode = 0;
    ELSEIF van != 1 THEN
		-- Nincs olyan felhasznalo
        SET resultcode = 1;
	END IF;
END//
DELIMITER ;

-- Testing log in procedure
-- SELECT * FROM Felhasznalo;
-- CALL Bejelentkezes('gonzalez', 'gonzalez321', @qualification, @maint_specialist_id, @resultcode);
-- SELECT @qualification AS Szerepkor, @maint_specialist_id AS Karbantarto_ID, @resultcode AS Resultcode;
-- CALL Bejelentkezes('lusta', 'lusta321', @qualification, @maint_specialist_id, @resultcode);
-- SELECT @qualification AS Szerepkor, @maint_specialist_id AS Karbantarto_ID, @resultcode AS Resultcode;

-- ---------------------------------------------
-- Add device procedure
-- ---------------------------------------------
DROP PROCEDURE IF EXISTS Eszkoz_hozzaadasa;
DELIMITER //

CREATE PROCEDURE Eszkoz_hozzaadasa(IN device_name VARCHAR(50),
								   IN device_category_name VARCHAR(50),
                                   IN descrip LONGTEXT,
                                   IN location LONGTEXT,
                                   OUT resultcode INT)
BEGIN
	DECLARE check_esz_kat_nev INT;
    SELECT COUNT(Eszkoz_kategoria_neve) INTO check_esz_kat_nev
		FROM EszkozKategoria
        WHERE Eszkoz_kategoria_neve LIKE device_category_name;
	IF check_esz_kat_nev != 1 THEN
		-- Nem letezik a kategoria
        SET resultcode = 400;
	ELSE
		INSERT
			INTO Eszkoz (Eszkoz_neve, Eszkoz_kategoria_neve, Leiras, Elhelyezkedes)
            VALUES (device_name, device_category_name, descrip, location);
		SET resultcode = 0;
    END IF;
END//
DELIMITER ;

-- Testing add device procedure
-- SELECT * FROM Eszkoz;
-- CALL Eszkoz_hozzaadasa('lampa2', 'lampak', 'Vilagitja a 2-es irodat', 'A2', @resultcode);
-- SELECT @resultcode AS Resultcode;
-- CALL Eszkoz_hozzaadasa('lampa3', 'valami', 'Vilagitja a 3-es irodat', 'A3', @resultcode);
-- SELECT @resultcode AS Resultcode;

-- ---------------------------------
-- Add device category procedure
-- ---------------------------------
DROP PROCEDURE IF EXISTS EszkozKategoria_hozzaadasa;
DELIMITER //

CREATE PROCEDURE EszkozKategoria_hozzaadasa(IN device_category_name VARCHAR(50),
											IN qualification INT,
											IN period VARCHAR(50),
											IN norm_time INT,
                                            IN steps_descrip LONGTEXT,
                                            IN parent VARCHAR(50),
                                            OUT resultcode INT)
BEGIN
	DECLARE check_esz_kat_nev INT;
    DECLARE parent_period VARCHAR(50);

    SELECT COUNT(*) INTO check_esz_kat_nev
		FROM EszkozKategoria
        WHERE Eszkoz_kategoria_neve = device_category_name;

	IF check_esz_kat_nev >= 1 THEN
		-- Mar letezik a kategoria
        SET resultcode = 400;
	ELSE
		-- Nem volt olyan kategoria
        IF period IS NULL THEN
			SELECT Periodus INTO parent_period
				FROM EszkozKategoria
                WHERE Szulo = parent;
			INSERT
				INTO EszkozKategoria (Eszkoz_kategoria_neve, Kepesites_ID, Periodus, Norma_ido, Eloiras, Szulo)
				VALUES (device_category_name, qualification, parent_period, SEC_TO_TIME(norm_time * 3600), steps_descrip, parent);
			SET resultcode = 0;
		ELSE
			INSERT
				INTO EszkozKategoria (Eszkoz_kategoria_neve, Kepesites_ID, Periodus, Norma_ido, Eloiras, Szulo)
				VALUES (device_category_name, qualification, period, SEC_TO_TIME(norm_time * 3600), steps_descrip, parent);
			SET resultcode = 0;
        END IF;
    END IF;
END//
DELIMITER ;

-- Testing add device procedure
-- SELECT * FROM EszkozKategoria;
-- CALL EszkozKategoria_hozzaadasa('iroasztal', 'asztalos', 'heti', 30, 'Nezze meg a csavarokat, utana nezze meg oket', NULL, @resultcode);
-- SELECT @resultcode AS Resultcode;
-- CALL EszkozKategoria_hozzaadasa('szekek', 'valami', 'valami', 8, 'valami', 'valami', @resultcode);
-- SELECT @resultcode AS Resultcode;
-- CALL EszkozKategoria_hozzaadasa('dimmelheto lampak', 'villanyszerelo', NULL, 7, 'Emelje az ajtot, nezze meg a kabeleket', 'lampak', @resultcode);
-- SELECT @resultcode AS Resultcode;

-- ---------------------------------
-- List categories procedure
-- ---------------------------------
DROP PROCEDURE IF EXISTS Kategoriak_listazasa;
DELIMITER //

CREATE PROCEDURE Kategoriak_listazasa()
BEGIN
	SELECT *
		FROM EszkozKategoria;
END//
DELIMITER ;

-- Testing list categories procedures
-- CALL Kategoriak_listazasa();

-- ---------------------------------
-- List qualifications procedure
-- ---------------------------------
DROP PROCEDURE IF EXISTS Kepesitesek_listazasa;
DELIMITER //

CREATE PROCEDURE Kepesitesek_listazasa()
BEGIN
	SELECT Kepesites_ID, Kepesites_neve
		FROM Kepesites;
END//
DELIMITER ;

-- Testing list qualifications procedures
-- CALL Kepesitesek_listazasa();

-- ---------------------------------
-- Add qualification procedure
-- ---------------------------------
DROP PROCEDURE IF EXISTS Kepesites_hozzaadasa;
DELIMITER //

CREATE PROCEDURE Kepesites_hozzaadasa(IN qualification_name VARCHAR(50),
									  OUT resultcode INT)
BEGIN
	DECLARE check_kepesites_nev INT;
	SELECT COUNT(*) INTO check_kepesites_nev
		FROM Kepesites
		WHERE Kepesites_neve = qualification_name;

	IF check_kepesites_nev >= 1 THEN
		-- Mar letezik a kepesites
		SET resultcode = 400;
	ELSE
		-- Nem volt olyan kepesites
		INSERT
			INTO Kepesites (Kepesites_neve)
			VALUES (qualification_name);
		SET resultcode = 0;
	END IF;
END//
DELIMITER ;

-- Testing add qualification procedure
-- SELECT * FROM Kepesites;
-- CALL Kepesites_hozzaadasa('autoszerelo', @resultcode);
-- SELECT @resultcode AS Resultcode;

-- --------------------------------------
-- List maintenance specialists procedure
-- --------------------------------------
DROP PROCEDURE IF EXISTS Karbantartok_listazasa;
DELIMITER //

CREATE PROCEDURE Karbantartok_listazasa()
BEGIN
	SELECT *
		FROM Karbantarto;
END//
DELIMITER ;

-- Testing list maintenance specialists procedure
-- CALL Karbantartok_listazasa();

-- ------------------------------------
-- Add maintenance specialist procedure
-- ------------------------------------
DROP PROCEDURE IF EXISTS Karbantarto_hozzaadasa;
DELIMITER //

CREATE PROCEDURE Karbantarto_hozzaadasa(IN last_name VARCHAR(50),
										IN first_name VARCHAR(50),
										IN qualification INT,
										IN username VARCHAR(50),
										IN password VARCHAR(20),
										OUT resultcode INT)
BEGIN
	DECLARE userid INT;
	INSERT
		INTO Felhasznalo (Felhasznalonev, Jelszo, Szerepkor)
		VALUES (username, password, 'karbantarto');

	SELECT MAX(Felhasznalo_ID) INTO userid
		FROM Felhasznalo;

	INSERT
		INTO Karbantarto (Vezeteknev, Keresztnev, Kepesites_ID, Felhasznalo_ID)
		VALUES (last_name, first_name, qualification, userid);
	SET resultcode = 0;
END//
DELIMITER ;

-- Testing add maintenance specialist procedure
-- SELECT * FROM Karbantarto;
-- CALL Karbantarto_hozzaadasa('Kovacs', 'Mate', '2', 'mate', 'mate321', @resultcode);
-- SELECT @resultcode AS Resultcode;

-- ----------------------------------------
-- List devices procedure
-- ----------------------------------------
DROP PROCEDURE IF EXISTS Eszkozok_listazasa;
DELIMITER //

CREATE PROCEDURE Eszkozok_listazasa()
BEGIN
	SELECT *
		FROM Eszkoz;
END//
DELIMITER ;

-- ----------------------------------------
-- Add maintenance procedure
-- ----------------------------------------
DROP PROCEDURE IF EXISTS Feladat_hozzaadasa;
DELIMITER //

CREATE PROCEDURE Feladat_hozzaadasa(IN device_ID INT,
									IN task_name VARCHAR(50),
									IN status INT,
									IN no_justification LONGTEXT,
									IN maint_specialist_ID INT,
									IN task_start DATETIME,
									IN task_end DATETIME,
									IN norm_time VARCHAR(50),
									IN steps_descrip LONGTEXT)
BEGIN
	INSERT
		INTO Feladat (Eszkoz_ID,
					  Nev, 
					  Allapot, 
					  Elutasitas_indoklasa, 
					  Karbantarto_ID,
					  Kezdeti_idopont, 
					  Befejezesi_idopont, 
					  Norma_ido, 
					  Eloiras)
		VALUES (device_ID, 
				task_name, 
				status, 
				no_justification, 
				maint_specialist_ID,
				task_start,
				task_end, 
				SEC_TO_TIME(norm_time * 3600), 
				steps_descrip);
END//
DELIMITER ;

-- --------------------------------------------
-- Get maintenance locations procedure
-- --------------------------------------------
-- DROP PROCEDURE IF EXISTS Feladat_helye;
-- DELIMITER //

-- CREATE PROCEDURE Feladat_helye(IN device_ID INT,
-- 							   OUT location VARCHAR(50),
-- 							   OUT resultcode INT)
-- BEGIN
-- 	DECLARE check_device_ID INT;

-- 	SELECT COUNT(*) INTO check_device_ID
-- 		FROM Eszkoz
-- 		WHERE Eszkoz_ID = device_ID;

-- 	IF check_device_ID < 1 THEN
-- 		-- Nem letezik az eszkoz
-- 		SET resultcode = 400;
-- 	ELSE
-- 		-- Letezik az eszkoz
-- 		SELECT Elhelyezkedes INTO location
-- 			FROM Eszkoz
-- 			WHERE Eszkoz_ID = device_ID;
-- 		SET resultcode = 0;
-- 	END IF;	
-- END//
-- DELIMITER ;

-- Testing extraordinary maintenance location procedure
-- CALL RendkivulFeladat_helye(1, @location, @resultcode);
-- SELECT @location AS Location, @resultcode AS Resultcode;
-- CALL RendkivulFeladat_helye(100, @location, @resultcode);
-- SELECT @location AS Location, @resultcode AS Resultcode;

-- -----------------------------------------
-- List maintenances procedure
-- -----------------------------------------
DROP PROCEDURE IF EXISTS Feladatok_listazasa;
DELIMITER //

CREATE PROCEDURE Feladatok_listazasa()
BEGIN
	SELECT f.*, Elhelyezkedes, CONCAT(k.Vezeteknev, ' ', k.Keresztnev) AS Karbantarto
		FROM Feladat AS f JOIN Eszkoz USING (Eszkoz_ID) JOIN Karbantarto AS k USING (Karbantarto_ID);
END//
DELIMITER ;

-- -----------------------------------------
-- Add periodic maintenance procedure
-- -----------------------------------------
DROP PROCEDURE IF EXISTS Idoszakos_feladat_hozzaadasa;
DELIMITER //

CREATE PROCEDURE Idoszakos_feladat_hozzaadasa(IN device_category_name VARCHAR(50),
											  IN task_name VARCHAR(50),
											  IN status INT,
											  IN maint_specialist_ID INT,
											  IN task_start DATETIME,
											  IN task_end DATETIME,
											  IN norm_time VARCHAR(50),
											  IN steps_descrip LONGTEXT,
											  IN ref_date DATETIME)
BEGIN
	INSERT
		INTO IdoszakosFeladat (Eszkoz_kategoria_neve,
							   Nev, 
							   Allapot,
							   Karbantarto_ID,
							   Kezdeti_idopont, 
							   Befejezesi_idopont, 
							   Norma_ido, 
							   Eloiras,
							   Referencia_datum)
		VALUES (device_category_name, 
				task_name, 
				status, 
				maint_specialist_ID, 
				task_start,
				task_end, 
				SEC_TO_TIME(norm_time * 3600), 
				steps_descrip,
				ref_date);
END//
DELIMITER ;

-- -----------------------------------------
-- List periodic maintenance procedure
-- -----------------------------------------
DROP PROCEDURE IF EXISTS Idoszakos_feladat_listazasa;
DELIMITER //

CREATE PROCEDURE Idoszakos_feladat_listazasa()
BEGIN
	SELECT *
		FROM IdoszakosFeladat;
END//
DELIMITER ;