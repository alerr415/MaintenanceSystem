package com.mansys.server.data;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.ResultSet;
import java.sql.CallableStatement;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;

import javafx.util.Pair;


/**
 * Singleton class for the database connection and functions for the transactions.
 * 
 * @author Tálas Martin
 * @author Tóth Bálint
 * @category Database
 */

public class DatabaseManager{

    //-----------------------------------------[ VARIABLES ]------------------------------------------

    final String URL = "jdbc:mysql://localhost:3306/maintenancesystem2";
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

    public Pair<Integer,String> authenticateUser(String username, String password) {
        try {
            connection = DriverManager.getConnection(URL, USERNAME, PASSWORD);
            String sendProcedure = "{CALL Bejelentkezes(?, ?, ?, ?)}";
            CallableStatement callableStatement = connection.prepareCall(sendProcedure);

            callableStatement.setString("username",username);
            callableStatement.setString("pass",password);
            callableStatement.registerOutParameter("qualification",java.sql.Types.VARCHAR);
            callableStatement.registerOutParameter("resultcode",java.sql.Types.INTEGER);

            callableStatement.execute();

            int resCode = callableStatement.getInt("resultcode");
            String role = callableStatement.getString("qualification");
            System.out.println("[DATABASE]: Called Bejelentkezes, result: " + resCode + ", role: " + role);

            return new Pair<>(resCode,role);
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

        return new Pair<>(-1,"Internal error");
    }

    public int addDevice(String deviceName, String deviceCategoryName, String deviceDescription, String devPosition)
    {
        try {
            connection = DriverManager.getConnection(URL, USERNAME, PASSWORD);
            String call = "{CALL Eszkoz_hozzaadasa(?, ?, ?, ?, ?)}";

            CallableStatement callableStatement = connection.prepareCall(call);
            callableStatement.setString("device_name",deviceName);
            callableStatement.setString("device_category_name",deviceCategoryName);
            callableStatement.setString("descrip",deviceDescription);
            callableStatement.setString("location",devPosition);

            callableStatement.registerOutParameter("resultcode", java.sql.Types.INTEGER);

            callableStatement.execute();

            int resCode = callableStatement.getInt("resultCode");
            System.out.println("[DATABASE]: Called Eszkoz_hozzaadasa, result: " + resCode);
            return resCode;
        } 
        catch (SQLException ex) {
            System.err.println("[ERROR]: Error occured in function addDevice: " + ex + "\nStack trace: ");
            ex.printStackTrace();
        } 
        finally {
            try {
                if (connection != null) {
                    connection.close();
                }
            } 
            catch (SQLException ex) {
                System.err.println("[ERROR]: Error occured in function addDevice when try to close connection: " + ex + "\nStack trace: ");
                ex.printStackTrace();
            }
        }  
        
        return -1;
    }

    public int addCategory(String categoryName, String qualification, String categoryPeriod, String categoryNormalTime, String specification, String parent)
    {
        try {
            connection = DriverManager.getConnection(URL, USERNAME, PASSWORD);
            String call = "{CALL EszkozKategoria_hozzaadasa(?, ?, ?, ?, ?, ?, ?)}";

            CallableStatement callableStatement = connection.prepareCall(call);
            callableStatement.setString("device_category_name",categoryName);
            callableStatement.setString("qualification",qualification);
            callableStatement.setString("period",categoryPeriod);
            callableStatement.setString("norm_time",categoryNormalTime);
            callableStatement.setString("descrip",specification);
            callableStatement.setString("parent",parent);

            callableStatement.registerOutParameter("resultcode", java.sql.Types.INTEGER);

            callableStatement.execute();

            int resCode = callableStatement.getInt("resultCode");
            System.out.println("[DATABASE]: Called Eszkoz_hozzaadasa, result: " + resCode);
            return resCode;
        } 
        catch (SQLException ex) {
            System.err.println("[ERROR]: Error occured in function addCategory: " + ex + "\nStack trace: ");
            ex.printStackTrace();
        } 
        finally {
            try {
                if (connection != null) {
                    connection.close();
                }
            } 
            catch (SQLException ex) {
                System.err.println("[ERROR]: Error occured in function addCategory when try to close connection: " + ex + "\nStack trace: ");
                ex.printStackTrace();
            }
        }   

        return 0;
    }

    public String[] listCategory()
    {
        String[] res;
        List<String> dataList = new ArrayList<>(); 

        try {
            connection = DriverManager.getConnection(URL, USERNAME, PASSWORD);
            
            //---[TEMPORARY QUERY]
            String query = "SELECT Eszkoz_kategoria_neve FROM eszkozkategoria";
            
            Statement statement = connection.createStatement();
            ResultSet resultSet = statement.executeQuery(query);
            
            while (resultSet.next())
            {
                String dataSnippet = resultSet.getString(1);
                dataList.add(dataSnippet);
            }

            statement.cancel();
            
            res = new String[dataList.size()];
            res = dataList.toArray(res);

            for(String item : res)
            {
                System.out.println(item);
            }
            //---[END OF TEMPORARY QUERY]
        } 
        catch (SQLException ex) {
            System.err.println("[ERROR]: Error occured in function listCategory: " + ex + "\nStack trace: ");
            ex.printStackTrace();
            res = new String[0];
        } 
        finally {
            try {
                if (connection != null) {
                    connection.close();
                }
            } 
            catch (SQLException ex) {
                System.err.println("[ERROR]: Error occured in function listCategory when try to close connection: " + ex + "\nStack trace: ");
                ex.printStackTrace();
            }
        }   

        return res;
    }

    @Deprecated
    public int addQualication(int qualificationID,  String qualificationName)
    {
        try {
            connection = DriverManager.getConnection(URL, USERNAME, PASSWORD);
        } 
        catch (SQLException ex) {
            System.err.println("[ERROR]: Error occured in function addQualication: " + ex + "\nStack trace: ");
            ex.printStackTrace();
        } 
        finally {
            try {
                if (connection != null) {
                    connection.close();
                }
            } 
            catch (SQLException ex) {
                System.err.println("[ERROR]: Error occured in function addQualication when try to close connection: " + ex + "\nStack trace: ");
                ex.printStackTrace();
            }
        }   

        return 0;
    }

    public String[] listQualification()
    {
        String[] res;
        List<String> dataList = new ArrayList<>(); 

        try {
            connection = DriverManager.getConnection(URL, USERNAME, PASSWORD);
            
            String call = "{CALL Kepesitesek_listazasa()}";
            CallableStatement callableStatement = connection.prepareCall(call);
            ResultSet resultSet = callableStatement.executeQuery();
            
            while (resultSet.next()) {
                dataList.add(resultSet.getString(1));
            }

            res = new String[dataList.size()];
            res = dataList.toArray(res);

        } 
        catch (SQLException ex) {
            System.err.println("[ERROR]: Error occured in function listQualification: " + ex + "\nStack trace: ");
            ex.printStackTrace();
            res = new String[0];
        } 
        finally {
            try {
                if (connection != null) {
                    connection.close();
                }
            } 
            catch (SQLException ex) {
                System.err.println("[ERROR]: Error occured in function listQualification when try to close connection: " + ex + "\nStack trace: ");
                ex.printStackTrace();
            }
        }   

        return res;
    }
}
