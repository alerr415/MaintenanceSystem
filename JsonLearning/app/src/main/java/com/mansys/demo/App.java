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
        Connection connection;
        String url = "jdbc:mysql://192.168.8.101:3306/test";

        connection = null;

        try {
            connection = DriverManager.getConnection(url, "root", "");

            String trans = "{CALL sp_AuthenticateUser(?, ?, ?)}";
            CallableStatement stmt = connection.prepareCall(trans);

            stmt.setString("uname", "asd");
            stmt.setString("passw", "asd");
            stmt.registerOutParameter("res", Types.INTEGER);
            
            System.out.println(stmt.toString());

            boolean succ = stmt.execute();
            System.out.println("Tran status: " + succ);
            System.out.println("Result: " + stmt.getInt("res"));
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
