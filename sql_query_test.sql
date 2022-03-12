--DROP DATABASE IF EXISTS MaintenanceSystem
--CREATE DATABASE MaintenanceSystem
--USE MaintenanceSystem

DROP TABLE IF EXISTS Feladat
DROP TABLE IF EXISTS Karbantarto
DROP TABLE IF EXISTS Kepesites
DROP TABLE IF EXISTS Eszkoz
DROP TABLE IF EXISTS Eszkoz_kategoria
DROP TABLE IF EXISTS Felhasznalo

CREATE TABLE Felhasznalo (
    Felhasznalo_ID INT PRIMARY KEY,
    Felhasznalonev VARCHAR(50),
    Jelszo VARCHAR(50)
)

CREATE TABLE Eszkoz_kategoria(
    Eszkoz_kategoria_ID INT PRIMARY KEY,
    Kategoria_neve VARCHAR(50)
)

CREATE TABLE Eszkoz (
    Eszkoz_ID INT PRIMARY KEY,
    Eszkoz_neve VARCHAR(20),
    Leiras VARCHAR(50),
    Elhelyezkedes VARCHAR(50),
    Eszkoz_kategoria_ID INT REFERENCES Eszkoz_kategoria
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

CREATE TABLE Feladat (
    Feladat_ID INT PRIMARY KEY,
    Eszkoz_ID INT REFERENCES Eszkoz,
    Nev VARCHAR(50),
    Norma_ido DATETIME,
    Allapot INT,
    Kepesites_ID INT REFERENCES Kepesites,
    Karbantarto_ID INT REFERENCES Karbantarto
)

INSERT 
    INTO Felhasznalo (Felhasznalo_ID, Felhasznalonev, Jelszo)
    VALUES (1, 'ale', 'admin1'), 
           (2, 'balint', 'admin2'),
           (3, 'martin', 'admin3'),
           (4, 'tamas', 'admin4')

DROP PROCEDURE IF EXISTS Bejelentkezes
GO

CREATE PROCEDURE Bejelentkezes @username VARCHAR(50), @password VARCHAR(20) AS
BEGIN
    BEGIN TRY
        BEGIN TRAN

            DECLARE @felhasznalo_nev VARCHAR(50)
            DECLARE @jelszo VARCHAR(20)

            SELECT @felhasznalo_nev = Felhasznalonev, @jelszo = Jelszo
                FROM Felhasznalo
                WHERE Felhasznalonev = @username AND Jelszo = @password
            IF @felhasznalo_nev IS NULL OR @jelszo IS NULL
                BEGIN
                    PRINT 'Nincs ilyen felhasznalo'
                    ROLLBACK TRAN
                    RETURN 0
                END
            ELSE
                BEGIN
                    PRINT 'Van ilyen felhasznalo'
                    RETURN 1
                    COMMIT TRAN
                END
    END TRY
    BEGIN CATCH
        PRINT CONCAT('Egyeb hiba tortent (', ERROR_NUMBER(), '): ', ERROR_MESSAGE())
        ROLLBACK TRAN
    END CATCH
END
GO

EXEC Bejelentkezes 'alee', 'admin1'
GO