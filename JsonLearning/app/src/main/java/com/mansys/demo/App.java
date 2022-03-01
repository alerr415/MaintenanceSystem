package com.mansys.demo;

import com.google.gson.*;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.ResultSet;
import java.sql.Statement;

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
            System.out.println("A kapcsolatfelvetel az alienekkel kezdetet vette!");
            connection = DriverManager.getConnection(url, "root", "");
            System.out.println("It just works!");

            Statement stm = connection.createStatement();
            ResultSet rst = stm.executeQuery("select * from users");
            rst.next();
            System.out.println(rst.getString(1));
        } 
        catch (Exception e) {
            throw new Error("You fucked up: ", e);
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
