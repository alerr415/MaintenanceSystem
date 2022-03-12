-- To drop database you should not be using MaintenanceSystem DB
-- DROP DATABASE IF EXISTS MaintenanceSystem2
-- CREATE DATABASE MaintenanceSystem2
-- USE MaintenanceSystem2

DROP TABLE IF EXISTS IdoszakosFeladat
DROP TABLE IF EXISTS RendkivulFeladat
DROP TABLE IF EXISTS Karbantarto
DROP TABLE IF EXISTS Felhasznalo
DROP TABLE IF EXISTS EszkozKategoria
DROP TABLE IF EXISTS Eszkoz

CREATE TABLE Felhasznalo(
    Felhasznalo_ID INT IDENTITY(1,1) PRIMARY KEY,
    Felhasznalonev VARCHAR(50),
    Jelszo VARCHAR(50),
    Szerepkor VARCHAR(50)
)

CREATE TABLE Karbantarto(
    Karbantarto_ID INT IDENTITY(1,1) PRIMARY KEY,
    Vezeteknev VARCHAR(50),
    Keresztnev VARCHAR(50),
    Kepesites_neve VARCHAR(50)
)

CREATE TABLE EszkozKategoria(
    Eszkoz_kategoria_neve VARCHAR(50) PRIMARY KEY,
    Kepesites_neve VARCHAR(50),
    Periodus VARCHAR(50),
    Norma_ido DATETIME,
    Eloiras VARCHAR(MAX)
)

CREATE TABLE Eszkoz(
    Eszkoz_neve VARCHAR(50) PRIMARY KEY,
    Eszkoz_kategoria_neve VARCHAR(50),
    Leiras VARCHAR(50),
    Elhelyezkedes VARCHAR(50)
)

CREATE TABLE IdoszakosFeladat(
    IdoszakosFeladat_ID INT IDENTITY(1,1) PRIMARY KEY,
    Eszkoz_kategoria_neve VARCHAR(50),
    Nev VARCHAR(50),
    Allapot INT,
    Elutasitas_indoklasa VARCHAR(MAX),
    Kepesites_neve VARCHAR(50),
    Karbantarto_ID INT REFERENCES Karbantarto,
    Kezdeti_idopont DATETIME,
    Befejezesi_idopont DATETIME,
    Norma_ido DATETIME,
    Eloiras VARCHAR(MAX)
)

CREATE TABLE RendkivulFeladat(
    RendkivulFeladat_ID INT PRIMARY KEY,
    Eszkoz_neve VARCHAR(50),
    Nev VARCHAR(50),
    Allapot INT,
    Elutasitas_indoklasa VARCHAR(MAX),
    Kepesites_neve VARCHAR(50),
    Karbantarto_ID INT REFERENCES Karbantarto,
    Kezdeti_idopont DATETIME,
    Befejezesi_idopont DATETIME,
    Norma_ido DATETIME,
    Eloiras VARCHAR(MAX)
)

INSERT
    INTO Karbantarto (Vezeteknev, Keresztnev, Kepesites_neve)
    VALUES ('Gonzalez', 'Laszlo', 'villanyszerelo'),
           ('Kovacs', 'Pista', 'asztalos'),
           ('Lakatos', 'Brendon', 'gepesztechnikus'),
           ('Lusta', 'Aranka', 'gazvezetektechnikus'),
           ('Felipe', 'Quinto', 'vizvezetekszerelo')

INSERT
    INTO Felhasznalo (Felhasznalonev, Jelszo, Szerepkor)
    VALUES ('marika', 'marika321', 'operator'),
           ('ferike', 'ferike321', 'eszkozfelelos'),
           ('gonzalez', 'gonzalez321', 'karbantarto'),
           ('kovacs', 'kovacs321', 'karbantarto'),
           ('lakatos', 'lakatos321', 'karbantarto'),
           ('lusta', 'lusta321', 'karbantarto'),
           ('felipe', 'felipe321', 'karbantarto')

INSERT 
    INTO EszkozKategoria (Eszkoz_kategoria_neve, Kepesites_neve, Periodus, Norma_ido, Eloiras)
    VALUES ('lampak', 'villanyszerelo', 'eves', DATEADD(year, 1, SYSDATETIME()), 'Nezze meg mennyire vilagit, utana cserelje az izzokat'),
           ('asztalok', 'asztalos', 'eves', DATEADD(year, 1, SYSDATETIME()), 'Nezze meg a csavarokat, utana erositse meg oket'),
           ('hegesztogepek', 'gepesztechnikus', 'havi', DATEADD(month, 1, SYSDATETIME()), 'Toltse fel az oxigen palackokat, utana ellenorizze a kompresszort'),
           ('gazcsovek', 'vizvezetekszerelo','havi', DATEADD(month, 1, SYSDATETIME()), 'A szivattyu ellenorzese. Ellenorizze a biztonsagi csavarokat')

INSERT
    INTO Eszkoz (Eszkoz_neve, Eszkoz_kategoria_neve, Leiras, Elhelyezkedes)
    VALUES ('lampa1', 'lampak', 'Vilagitja az 1-es irodat', 'A1'),
           ('asztal1', 'asztalok', 'A fonok asztala', 'A0'),
           ('hegesztogep1', 'hegesztogepek', 'Vas hegesztesre szolgal', 'B1'),
           ('gazcso1', 'gazcsovek', 'A konyha tuzhelyet szolgalja', 'K1')