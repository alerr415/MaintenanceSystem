package com.mansys.server;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.ResultSet;
import java.sql.Statement;
import java.sql.CallableStatement;
import java.sql.Types;


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
    boolean connectionIsActive;

    //------------------------------------------------------------------------------------------------
    //----------------------------------[ SINGLETON DESIGN PATTERN ]----------------------------------
    
    private static DatabaseManager singleton_instance = null;
    private DatabaseManager(){
        connection = null;
        connectionIsActive = false;
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
        System.out.println("end of static block");
    }

    //------------------------------------------------------------------------------------------------
    //---------------------------------------[ OTHER FUNCTIONS ]--------------------------------------

    public void TEMPLATE()
    {
        try {
            connection = DriverManager.getConnection(URL, USERNAME, PASSWORD);
        } 
        catch (SQLException ex) {
            System.err.println("[ERROR]: Error occured in function TEMPLATE: " + ex + "\nStack trace: ");
            ex.printStackTrace();
        } 
        finally {
            try {
                if (connection != null) {
                    connection.close();
                }
            } 
            catch (SQLException ex) {
                System.err.println("[ERROR]: Error occured in function TEMPLATE when try to close connection: " + ex + "\nStack trace: ");
                ex.printStackTrace();
            }
        }   
    }


    public void testProcedure()
    {
        try {
            connection = DriverManager.getConnection(URL, USERNAME, PASSWORD);

            String sendProcedure = "{CALL sp_AuthenticateUser(?, ?, ?)}";
            CallableStatement callableStatement = connection.prepareCall(sendProcedure);

            callableStatement.setString("uname", "ferenc");
            callableStatement.setString("passw", "asd123");
            callableStatement.registerOutParameter("res", Types.INTEGER);
            
            System.out.println(callableStatement.toString());

            boolean isSucceeded = callableStatement.execute();
            System.out.println("Transaction status: " + isSucceeded);
            System.out.println("Result: " + callableStatement.getInt("res"));
        } 
        catch (SQLException ex) {
            System.err.println("[ERROR]: Error occured in function TEMPLATE: " + ex + "\nStack trace: ");
            ex.printStackTrace();
        } 
        finally {
            try {
                if (connection != null) {
                    connection.close();
                }
            } 
            catch (SQLException ex) {
                System.err.println("[ERROR]: Error occured in function TEMPLATE when try to close connection: " + ex + "\nStack trace: ");
                ex.printStackTrace();
            }
        }   
    }
    //------------------------------------------------------------------------------------------------
}