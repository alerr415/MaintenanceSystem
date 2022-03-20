-- ----------------------------------------
-- Log in procedure
-- ----------------------------------------
DROP PROCEDURE IF EXISTS Bejelentkezes;
DELIMITER //

CREATE PROCEDURE Bejelentkezes (IN username VARCHAR(50), 
								IN pass VARCHAR(20), 
                                OUT qualification VARCHAR(50),
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
		SET resultcode = 0;
    ELSEIF van != 1 THEN
		-- Nincs olyan felhasznalo
        SET resultcode = 1;
	END IF;
END//
DELIMITER ;

-- Testing log in procedure
-- SELECT * FROM Felhasznalo;
-- CALL Bejelentkezes('marika', 'marika321', @qualification, @resultcode);
-- SELECT @qualification AS Szerepkor, @resultcode AS Resultcode;
-- CALL Bejelentkezes('ferike', 'ferike321', @qualification, @resultcode);
-- SELECT @qualification AS Szerepkor, @resultcode AS Resultcode;
-- CALL Bejelentkezes('kovacs', 'kovacs321', @qualification, @resultcode);
-- SELECT @qualification AS Szerepkor, @resultcode AS Resultcode;
-- CALL Bejelentkezes('valami', 'valami321', @qualification, @resultcode);
-- SELECT @qualification AS Szerepkor, @resultcode AS Resultcode;

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
											IN qualification VARCHAR(50),
											IN period VARCHAR(50),
											IN deadline VARCHAR(50),
                                            IN descrip LONGTEXT,
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
				INTO EszkozKategoria (Eszkoz_kategoria_neve, Kepesites_neve, Periodus, Norma_ido, Eloiras, Szulo)
				VALUES (device_category_name, qualification, parent_period, CONVERT(deadline, DATETIME), descrip, parent);
			SET resultcode = 0;
		ELSE
			INSERT
				INTO EszkozKategoria (Eszkoz_kategoria_neve, Kepesites_neve, Periodus, Norma_ido, Eloiras, Szulo)
				VALUES (device_category_name, qualification, period, CONVERT(deadline, DATETIME), descrip, parent);
			SET resultcode = 0;
        END IF;
    END IF;
END//
DELIMITER ;

-- Testing add device procedure
SELECT * FROM EszkozKategoria;
-- CALL EszkozKategoria_hozzaadasa('szekek', 'asztalos', 'heti', '2022-03-20', 'Nezze meg a csavarokat, utana nezze meg oket', NULL, @resultcode);
-- SELECT @resultcode AS Resultcode;
-- CALL EszkozKategoria_hozzaadasa('szekek', 'valami', 'valami', 'valami', 'valami', 'valami', @resultcode);
-- SELECT @resultcode AS Resultcode;
CALL EszkozKategoria_hozzaadasa('garazslampak', 'villanyszerelo', NULL, '2023-03-20', 'Emelje az ajtot, nezze meg a kabeleket', 'lampak', @resultcode);
SELECT @resultcode AS Resultcode;