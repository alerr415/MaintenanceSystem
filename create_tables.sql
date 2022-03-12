-- --To use this you should not be using MaintenanceSystem DB
-- DROP DATABASE IF EXISTS MaintenanceSystem
-- CREATE DATABASE MaintenanceSystem
-- USE MaintenanceSystem

DROP TABLE IF EXISTS Karbantarto
DROP TABLE IF EXISTS IdoszakosFeladat
DROP TABLE IF EXISTS RendkivulFeladat
DROP TABLE IF EXISTS Kepesites
DROP TABLE IF EXISTS Felhasznalo
DROP TABLE IF EXISTS EszkozKategoria
DROP TABLE IF EXISTS Eszkoz

CREATE TABLE Felhasznalo(
    Felhasznalo_ID INT PRIMARY KEY,
    Felhasznalonev VARCHAR(50),
    Jelszo VARCHAR(50),
    Feleloseg VARCHAR(50)
)

CREATE TABLE Kepesites(
    Kepesites_ID INT PRIMARY KEY,
    Kepesites_neve VARCHAR(50)
)

CREATE TABLE Karbantarto(
    Karbantarto_ID INT PRIMARY KEY,
    Vezeteknev VARCHAR(50),
    Keresztnev VARCHAR(50),
    Kepesites_ID INT REFERENCES Kepesites
)

CREATE TABLE EszkozKategoria(
    Eszkoz_kategoria_ID INT PRIMARY KEY,
    Kategoria_neve VARCHAR(50),
    Kepesites_ID INT REFERENCES Kepesites,
    Periodus VARCHAR(50),
    Norma_ido DATE,
    Eloiras VARCHAR(MAX)
)

CREATE TABLE Eszkoz(
    Eszkoz_ID INT PRIMARY KEY,
    Eszkoz_neve VARCHAR(50),
    Eszkoz_kategoria_ID INT REFERENCES EszkozKategoria,
    Leiras VARCHAR(50),
    Elhelyezkedes VARCHAR(50)
)

CREATE TABLE IdoszakosFeladat(
    IdoszakosFeladat_ID INT PRIMARY KEY,
    Eszkoz_kategoria_ID INT REFERENCES EszkozKategoria,
    Nev VARCHAR(50),
    Allapot INT,
    Elutasitas_indoklasa VARCHAR(MAX),
    Kepesites_ID INT REFERENCES Kepesites,
    Karbantarto_ID INT REFERENCES Karbantarto,
    Kezdeti_idopont DATETIME,
    Befejezesi_idopont DATETIME,
    Norma_ido DATE,
    Eloiras VARCHAR(MAX)
)

CREATE TABLE RendkivulFeladat(
    RendkivulFeladat_ID INT PRIMARY KEY,
    Eszkoz_ID INT REFERENCES Eszkoz,
    Nev VARCHAR(50),
    Allapot INT,
    Elutasitas_indoklasa VARCHAR(MAX),
    Kepesites_ID INT REFERENCES Kepesites,
    Karbantarto_ID INT REFERENCES Karbantarto,
    Kezdeti_idopont DATETIME,
    Befejezesi_idopont DATETIME,
    Norma_ido DATETIME,
    Eloiras VARCHAR(MAX)
)