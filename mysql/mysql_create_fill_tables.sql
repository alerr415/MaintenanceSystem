-- ----------------------------------------------------------------------------
-- Schema MaintenanceSystem2
-- ----------------------------------------------------------------------------
DROP SCHEMA IF EXISTS MaintenanceSystem2;
CREATE SCHEMA IF NOT EXISTS MaintenanceSystem2;
USE MaintenanceSystem2;
-- ----------------------------------------------------------------------------
-- Table MaintenanceSystem2.Karbantarto
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS MaintenanceSystem2.Karbantarto (
  Karbantarto_ID INT NOT NULL AUTO_INCREMENT,
  Vezeteknev VARCHAR(50) NULL,
  Keresztnev VARCHAR(50) NULL,
  Kepesites_neve VARCHAR(50) NULL,
  PRIMARY KEY (Karbantarto_ID)
);
-- ----------------------------------------------------------------------------
-- Table MaintenanceSystem2.IdoszakosFeladat
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS MaintenanceSystem2.IdoszakosFeladat (
  IdoszakosFeladat_ID INT NOT NULL AUTO_INCREMENT,
  Eszkoz_kategoria_neve VARCHAR(50) NULL,
  Nev VARCHAR(50) NULL,
  Allapot INT NULL,
  Elutasitas_indoklasa LONGTEXT NULL,
  Kepesites_neve VARCHAR(50) NULL,
  Karbantarto_ID INT NOT NULL,
  Kezdeti_idopont DATETIME NULL,
  Befejezesi_idopont DATETIME NULL,
  Norma_ido TIME NULL,
  Eloiras LONGTEXT NULL,
  PRIMARY KEY (IdoszakosFeladat_ID),
  FOREIGN KEY (Karbantarto_ID)
    REFERENCES MaintenanceSystem2.Karbantarto (Karbantarto_ID)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);
-- ----------------------------------------------------------------------------
-- Table MaintenanceSystem2.RendkivulFeladat
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS MaintenanceSystem2.RendkivulFeladat (
  RendkivulFeladat_ID INT NOT NULL AUTO_INCREMENT,
  Eszkoz_ID INT,
  Eszkoz_neve VARCHAR(50) NULL,
  Nev VARCHAR(50) NULL,
  Allapot INT NULL,
  Elutasitas_indoklasa LONGTEXT NULL,
  Kepesites_neve VARCHAR(50) NULL,
  Karbantarto_ID INT NOT NULL,
  Kezdeti_idopont DATETIME NULL,
  Befejezesi_idopont DATETIME NULL,
  Norma_ido TIME NULL,
  Eloiras LONGTEXT NULL,
  PRIMARY KEY (RendkivulFeladat_ID),
  FOREIGN KEY (Karbantarto_ID)
    REFERENCES MaintenanceSystem2.Karbantarto (Karbantarto_ID)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);
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
-- Table MaintenanceSystem2.EszkozKategoria
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS MaintenanceSystem2.EszkozKategoria (
  Eszkoz_kategoria_neve VARCHAR(50) NOT NULL,
  Kepesites_neve VARCHAR(50) NULL,
  Periodus VARCHAR(50) NULL,
  Norma_ido TIME NULL,
  Eloiras LONGTEXT NULL,
  Szulo VARCHAR(50) NULL,
  PRIMARY KEY (Eszkoz_kategoria_neve)
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
  PRIMARY KEY (Eszkoz_ID)
  );
-- ----------------------------------------------------------------------------
-- Fill tables
-- ---------------------------------------------------------------------------
USE maintenancesystem2;
INSERT
    INTO Karbantarto (Vezeteknev, Keresztnev, Kepesites_neve)
    VALUES ('Gonzalez', 'Laszlo', 'villanyszerelo'),
           ('Kovacs', 'Pista', 'asztalos'),
           ('Lakatos', 'Brendon', 'gepesztechnikus'),
           ('Lusta', 'Aranka', 'gazvezetektechnikus'),
           ('Felipe', 'Quinto', 'vizvezetekszerelo');

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
    INTO EszkozKategoria (Eszkoz_kategoria_neve, Kepesites_neve, Periodus, Norma_ido, Eloiras, Szulo)
    VALUES ('lampak', 'villanyszerelo', 'eves', MAKETIME(8, 0, 0), 'Nezze meg mennyire vilagit, utana cserelje az izzokat', 'vilagitoberendezesek'),
		   ('vilagitoberendezesek', 'villanyszerelo', 'eves', MAKETIME(8, 0, 0), 'Cserelje az izzokat es igazitsa a kabeleket', NULL),
           ('zseblampak', 'villanyszerelo', 'eves', MAKETIME(8, 0, 0), 'Cserelje az izzokat es igazitsa a kabeleket', 'lampak'),
           ('asztalok', 'asztalos', 'eves', MAKETIME(8, 0, 0), 'Nezze meg a csavarokat, utana erositse meg oket', NULL),
           ('hegesztogepek', 'gepesztechnikus', 'havi', MAKETIME(8, 0, 0), 'Toltse fel az oxigen palackokat, utana ellenorizze a kompresszort', NULL),
           ('gazcsovek', 'vizvezetekszerelo','havi', MAKETIME(8, 0, 0), 'A szivattyu ellenorzese. Ellenorizze a biztonsagi csavarokat', NULL);

INSERT
    INTO Eszkoz (Eszkoz_neve, Eszkoz_kategoria_neve, Leiras, Elhelyezkedes)
    VALUES ('lampa1', 'lampak', 'Vilagitja az 1-es irodat', 'A1'),
           ('asztal1', 'asztalok', 'A fonok asztala', 'A0'),
           ('hegesztogep1', 'hegesztogepek', 'Vas hegesztesre szolgal', 'B1'),
           ('gazcso1', 'gazcsovek', 'A konyha tuzhelyet szolgalja', 'K1');