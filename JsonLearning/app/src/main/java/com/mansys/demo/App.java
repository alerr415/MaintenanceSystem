package com.mansys.demo;

import com.google.gson.*;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.ResultSet;
import java.sql.Statement;
import java.sql.CallableStatement;
import java.sql.Types;

public class App {


    public static void main(String[] args) {
        try{
            Class.forName("com.mysql.cj.jdbc.Driver");
        }
        catch(Exception ex){
            throw new Error("CLASS_LOADER_ERROR: " + ex.getMessage() + "\n" + ex);
        }

        //gsonReader();
        createConn();
    }

    public static void createConn()
    {
        Connection connection = null;
        final String URL = "jdbc:mysql://192.168.8.101:3306/test";
        final String USERNAME = "root";
        final String PASSWORD = "";

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


    public static void gsonReader(){
        String jsonString = "{\"name\":\"Biggus Dickus\", \"age\":21}"; 
      
        GsonBuilder builder = new GsonBuilder(); 
        builder.setPrettyPrinting(); 
        
        Gson gson = builder.create(); 
        Student student = gson.fromJson(jsonString, Student.class); 
        System.out.println(student);    
        
        jsonString = gson.toJson(student); 
        System.out.println(jsonString);
    }
}
