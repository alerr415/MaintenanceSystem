package com.mansys.server;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.ResultSet;
import java.sql.Statement;
import java.sql.CallableStatement;
import java.sql.Types;

import javax.print.DocFlavor.STRING;

/**
 * Singleton class for the database connection and functions for the transactions.
 * 
 * @author Tálas Martin
 * @category Database
 */

public class DatabaseManager {

    //-----------------------------------------[ VARIABLES ]------------------------------------------

    final String URL = "jdbc:mysql://192.168.8.101:3306/test";
    final String USERNAME = "root";
    final String PASSWORD = "";
    
    Connection connection;

    //------------------------------------------------------------------------------------------------
    //----------------------------------[ SINGLETON DESIGN PATTERN ]----------------------------------
    
    private static DatabaseManager singleton_instance = null;
    private DatabaseManager(){
        connection = null;
    }
 
    public static DatabaseManager getInstance(){
        if (singleton_instance == null){
            singleton_instance = new DatabaseManager();
        }

        return singleton_instance;
    }
    
    //------------------------------------------------------------------------------------------------
    //--------------------------------[ STATIC BLOCK FOR JDBC DRIVER ]--------------------------------

    static {
        try{
            Class.forName("com.mysql.cj.jdbc.Driver");
        }
        catch(Exception ex){
            System.err.println("[ERROR]: Failed to load driver class: " + ex + "\nStack trace: ");
            ex.printStackTrace();
        }
    }

    //------------------------------------------------------------------------------------------------
    //---------------------------------------[ OTHER FUNCTIONS ]--------------------------------------
    public void TEMPLATE()
    {
        try {
            connection = DriverManager.getConnection(URL, USERNAME, PASSWORD);
        } 
        catch (Exception e) {
            throw new Error("You fucked up: ", e);
            //throw new Error(e.getMessage());
        } 
        finally {
            try {
                if (connection != null) {
                    connection.close();
                }
            } 
            catch (Exception ex) {
                System.out.println(ex.getMessage());
            }
        }   
    }
    //------------------------------------------------------------------------------------------------
}
