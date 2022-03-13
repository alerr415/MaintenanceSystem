-- Log in procedure
DROP PROCEDURE IF EXISTS Bejelentkezes
GO

CREATE PROCEDURE Bejelentkezes 
    @username VARCHAR(50), 
    @password VARCHAR(20), 
    @szerepkor VARCHAR(50) OUTPUT 
AS
SET NOCOUNT ON
        
    DECLARE @felhasznalo_nev VARCHAR(50)
    DECLARE @jelszo VARCHAR(20)

    SELECT @felhasznalo_nev = Felhasznalonev, @jelszo = Jelszo
        FROM Felhasznalo
        WHERE Felhasznalonev = @username AND Jelszo = @password
    SELECT @szerepkor = Szerepkor
        FROM Felhasznalo
        WHERE Felhasznalonev = @username AND Jelszo = @password
    IF @felhasznalo_nev IS NULL OR @jelszo IS NULL
        BEGIN
            -- Nincs olyan felhasznalo
            RETURN 1
        END
    ELSE
        BEGIN
            -- Van olyan felhasznalo
            RETURN 0
        END
GO

-- Testing log in procedure
-- DECLARE @fel VARCHAR(50)
-- EXEC Bejelentkezes 'marika', 'marika321', @feleloseg = @fel OUTPUT
-- PRINT @fel
-- GO

-- Add device procedure
DROP PROCEDURE IF EXISTS Eszkoz_hozzaadasa
GO

CREATE PROCEDURE Eszkoz_hozzaadasa
    @eszkoz_neve VARCHAR(50), 
    @eszkoz_kategoria_neve VARCHAR(50), 
    @leiras VARCHAR(MAX), 
    @elhelyezkedes VARCHAR(50)
AS
SET NOCOUNT ON

    DECLARE @check_esz_kat_nev INT

    SELECT @check_esz_kat_nev = COUNT(Eszkoz_kategoria_neve)
        FROM EszkozKategoria
        WHERE Eszkoz_kategoria_neve LIKE @eszkoz_kategoria_neve

    BEGIN TRY
        IF @eszkoz_neve IS NULL 
            OR @eszkoz_kategoria_neve IS NULL
            OR @leiras IS NULL 
            OR @elhelyezkedes IS NULL
                BEGIN
                    PRINT 'Ures mezo'
                    RETURN 400
                END
        IF @check_esz_kat_nev < 1
            BEGIN
                PRINT 'Nincs olyan kategoria'
                RETURN 400
            END
        ELSE
            BEGIN
                INSERT
                    INTO Eszkoz (Eszkoz_neve, Eszkoz_kategoria_neve, Leiras, Elhelyezkedes)
                    VALUES (@eszkoz_neve, @eszkoz_kategoria_neve, @leiras, @elhelyezkedes)
                RETURN 0
            END
    END TRY
    BEGIN CATCH
        PRINT CONCAT('Egyeb hiba tortent (', ERROR_NUMBER(), '): ', ERROR_MESSAGE())
    END CATCH
GO

-- Testing add device procedure
-- EXEC Eszkoz_hozzaadasa 'lampa2', 'lampak', 'Vilagitja a 2-es irodat', 'A2'
-- GO

-- Add device category procedure
DROP PROCEDURE IF EXISTS EszkozKategoria_hozzadasa
GO

CREATE PROCEDURE EszkozKategoria_hozzaadasa
    @eszkoz_kategoria_neve VARCHAR(50), 
    @kepesites_neve VARCHAR(50), 
    @periodus VARCHAR(50), 
    @norma_ido VARCHAR(50),
    @eloiras VARCHAR(MAX)
AS
SET NOCOUNT ON

    BEGIN TRY
        IF @eszkoz_kategoria_neve IS NULL 
            OR @eszkoz_kategoria_neve IS NULL
            OR @kepesites_neve IS NULL 
            OR @periodus IS NULL
            OR @norma_ido IS NULL
            OR @eloiras IS NULL
                BEGIN
                    PRINT 'Ures mezo'
                    RETURN 400
                END
        ELSE
            BEGIN
                INSERT
                    INTO EszkozKategoria (Eszkoz_kategoria_neve, Kepesites_neve, Periodus, Norma_ido, Eloiras)
                    VALUES (@eszkoz_kategoria_neve, @kepesites_neve, @periodus, @norma_ido, @eloiras)
                RETURN 0
            END
    END TRY
    BEGIN CATCH
        PRINT CONCAT('Egyeb hiba tortent (', ERROR_NUMBER(), '): ', ERROR_MESSAGE())
    END CATCH
GO

-- Testing device category procedure
-- EXEC EszkozKategoria_hozzaadasa 'szekek', 'asztalos', 'heti', '2022-03-19', 'Nezze meg a csavarokat, utana nezze meg oket'
-- GO