-- ----------------------------------------------------------------------------
-- Schema MaintenanceSystem2
-- ----------------------------------------------------------------------------
DROP SCHEMA IF EXISTS MaintenanceSystem2;
CREATE SCHEMA IF NOT EXISTS MaintenanceSystem2;
USE MaintenanceSystem2;
-- ----------------------------------------------------------------------------
-- Table MaintenanceSystem2.Felhasznalo
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS MaintenanceSystem2.Felhasznalo (
  Felhasznalo_ID INT NOT NULL AUTO_INCREMENT,
  Felhasznalonev VARCHAR(50) NOT NULL,
  Jelszo VARCHAR(50) NOT NULL,
  Szerepkor VARCHAR(50) NOT NULL,
  PRIMARY KEY (Felhasznalo_ID)
);
-- ----------------------------------------------------------------------------
-- Table MaintenanceSystem2.Kepesites
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS MaintenanceSystem2.Kepesites (
    Kepesites_ID INT AUTO_INCREMENT,
    Kepesites_neve VARCHAR(50) NOT NULL,
    PRIMARY KEY (Kepesites_ID)
);
-- ----------------------------------------------------------------------------
-- Table MaintenanceSystem2.Karbantarto
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS MaintenanceSystem2.Karbantarto (
  Karbantarto_ID INT NOT NULL AUTO_INCREMENT,
  Vezeteknev VARCHAR(50) NULL,
  Keresztnev VARCHAR(50) NULL,
  Kepesites_ID INT NOT NULL,
  Felhasznalo_ID INT NOT NULL,
  PRIMARY KEY (Karbantarto_ID),
  FOREIGN KEY (Kepesites_ID) 
    REFERENCES MaintenanceSystem2.Kepesites (Kepesites_ID)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  FOREIGN KEY (Felhasznalo_ID) 
    REFERENCES MaintenanceSystem2.Felhasznalo (Felhasznalo_ID)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);
-- ----------------------------------------------------------------------------
-- Table MaintenanceSystem2.EszkozKategoria
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS MaintenanceSystem2.EszkozKategoria (
  Eszkoz_kategoria_neve VARCHAR(50) NOT NULL,
  Kepesites_ID INT NOT NULL,
  Periodus VARCHAR(50) NULL,
  Norma_ido TIME NULL,
  Eloiras LONGTEXT NULL,
  Szulo VARCHAR(50) NULL,
  PRIMARY KEY (Eszkoz_kategoria_neve),
  FOREIGN KEY (Kepesites_ID)
    REFERENCES MaintenanceSystem2.Kepesites (Kepesites_ID)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);
-- ----------------------------------------------------------------------------
-- Table MaintenanceSystem2.IdoszakosFeladat
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS MaintenanceSystem2.IdoszakosFeladat (
  IdoszakosFeladat_ID INT NOT NULL AUTO_INCREMENT,
  Eszkoz_kategoria_neve VARCHAR(50) NULL,
  Nev VARCHAR(50) NULL,
  Allapot INT NULL,
  Karbantarto_ID INT NOT NULL,
  Kezdeti_idopont DATETIME NULL,
  Befejezesi_idopont DATETIME NULL,
  Norma_ido TIME NULL,
  Eloiras LONGTEXT NULL,
  Referencia_datum DATETIME NULL,
  PRIMARY KEY (IdoszakosFeladat_ID),
  FOREIGN KEY (Eszkoz_kategoria_neve) 
    REFERENCES MaintenanceSystem2.EszkozKategoria (Eszkoz_kategoria_neve)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  FOREIGN KEY (Karbantarto_ID)
    REFERENCES MaintenanceSystem2.Karbantarto (Karbantarto_ID)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);
-- ----------------------------------------------------------------------------
-- Table MaintenanceSystem2.Eszkoz
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS MaintenanceSystem2.Eszkoz (
  Eszkoz_ID INT NOT NULL AUTO_INCREMENT,
  Eszkoz_neve VARCHAR(50) NOT NULL,
  Eszkoz_kategoria_neve VARCHAR(50) NULL,
  Leiras VARCHAR(50) NULL,
  Elhelyezkedes VARCHAR(50) NULL,
  PRIMARY KEY (Eszkoz_ID),
  FOREIGN KEY (Eszkoz_kategoria_neve) 
    REFERENCES MaintenanceSystem2.EszkozKategoria (Eszkoz_kategoria_neve)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);
-- ----------------------------------------------------------------------------
-- Table MaintenanceSystem2.Feladat
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS MaintenanceSystem2.Feladat (
  Feladat_ID INT NOT NULL AUTO_INCREMENT,
  Eszkoz_ID INT,
  Nev VARCHAR(50) NULL,
  Allapot INT NULL,
  Elutasitas_indoklasa LONGTEXT NULL,
  Karbantarto_ID INT NULL,
  Kezdeti_idopont DATETIME NULL,
  Befejezesi_idopont DATETIME NULL,
  Norma_ido TIME NULL,
  Eloiras LONGTEXT NULL,
  PRIMARY KEY (Feladat_ID),
  FOREIGN KEY (Eszkoz_ID)
    REFERENCES MaintenanceSystem2.Eszkoz (Eszkoz_ID)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  FOREIGN KEY (Karbantarto_ID)
    REFERENCES MaintenanceSystem2.Karbantarto (Karbantarto_ID)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);
-- ----------------------------------------------------------------------------
-- Fill tables
-- ---------------------------------------------------------------------------
USE maintenancesystem2;

INSERT
    INTO Kepesites (Kepesites_neve)
    VALUES ('villanyszerelo'),
           ('asztalos'),
           ('gepesztechnikus'),
           ('gazvezetektechnikus'),
           ('vizvezetekszerelo');

INSERT 
	INTO Felhasznalo (Felhasznalonev, Jelszo, Szerepkor)
    VALUES ('marika', 'marika321', 'operator'),
           ('ferike', 'ferike321', 'eszkozfelelos'),
           ('gonzalez', 'gonzalez321', 'karbantarto'),
           ('kovacs', 'kovacs321', 'karbantarto'),
           ('lakatos', 'lakatos321', 'karbantarto'),
           ('lusta', 'lusta321', 'karbantarto'),
           ('felipe', 'felipe321', 'karbantarto');

INSERT
    INTO Karbantarto (Vezeteknev, Keresztnev, Kepesites_ID, Felhasznalo_ID)
    VALUES ('Gonzalez', 'Laszlo', 1, 3),
           ('Kovacs', 'Pista', 2, 4),
           ('Lakatos', 'Brendon', 3, 5),
           ('Lusta', 'Aranka', 4, 6),
           ('Felipe', 'Quinto', 5, 7);

INSERT 
    INTO EszkozKategoria (Eszkoz_kategoria_neve, Kepesites_ID, Periodus, Norma_ido, Eloiras, Szulo)
    VALUES ('lampak', 1, 'eves', MAKETIME(8, 0, 0), 'Nezze meg mennyire vilagit, utana cserelje az izzokat', 'vilagitoberendezesek'),
		       ('vilagitoberendezesek', 1, 'eves', MAKETIME(8, 0, 0), 'Cserelje az izzokat es igazitsa a kabeleket', NULL),
           ('zseblampak', 1, 'eves', MAKETIME(8, 0, 0), 'Cserelje az izzokat es igazitsa a kabeleket', 'lampak'),
           ('asztalok', 2, 'eves', MAKETIME(8, 0, 0), 'Nezze meg a csavarokat, utana erositse meg oket', NULL),
           ('hegesztogepek', 3, 'havi', MAKETIME(8, 0, 0), 'Toltse fel az oxigen palackokat, utana ellenorizze a kompresszort', NULL),
           ('gazcsovek', 4,'havi', MAKETIME(8, 0, 0), 'A szivattyu ellenorzese. Ellenorizze a biztonsagi csavarokat', NULL);

INSERT
    INTO Eszkoz (Eszkoz_neve, Eszkoz_kategoria_neve, Leiras, Elhelyezkedes)
    VALUES ('lampa1', 'lampak', 'Vilagitja az 1-es irodat', 'A1'),
           ('asztal1', 'asztalok', 'A fonok asztala', 'A0'),
           ('hegesztogep1', 'hegesztogepek', 'Vas hegesztesre szolgal', 'B1'),
           ('gazcso1', 'gazcsovek', 'A konyha tuzhelyet szolgalja', 'K1');

INSERT
    INTO Feladat (Eszkoz_ID, Nev, Allapot, Elutasitas_indoklasa,
                  Karbantarto_ID, Kezdeti_idopont, Befejezesi_idopont, Norma_ido, Eloiras)
    VALUES(1, 'Izzo csere', 1, NULL, 1, NULL, NULL, MAKETIME(8, 0, 0), 'A4-es izzot keresni utana cserelni')