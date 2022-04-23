package com.mansys.server.data;

import java.sql.Connection;
import java.sql.Date;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.ResultSet;
import java.sql.CallableStatement;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;

import com.mansys.server.backend.Category;
import com.mansys.server.backend.Device;
import com.mansys.server.backend.Maintenance;
import com.mansys.server.backend.Qualification;
import com.mansys.server.backend.TimerTask;
import com.mansys.server.backend.Worker;

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
        
        Pair<Integer, String> res = new Pair<>(-1,"Internal error");
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

            res = new Pair<>(resCode,role);
        } 
        catch (SQLException ex) {
            System.err.println("[ERROR]: Error occured in function TEMPLATE: " + ex + "\nStack trace: ");
            ex.printStackTrace();
            res = new Pair<>(-1,"Internal error");
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

        return res;
    }

    public int addDevice(String deviceName, String deviceCategoryName, String deviceDescription, String devPosition)
    {
        int resCode;
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

            resCode = callableStatement.getInt("resultCode");
            System.out.println("[DATABASE]: Called Eszkoz_hozzaadasa, result: " + resCode);
        } 
        catch (SQLException ex) {
            System.err.println("[ERROR]: Error occured in function addDevice: " + ex + "\nStack trace: ");
            ex.printStackTrace();
            resCode = 1;
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
                resCode = 1;
            }
        }  
        
        return resCode;
    }

    public int addCategory(String categoryName, int qualificationID, String categoryPeriod, String categoryNormalTime, String specification, String parent)
    {
        int resCode;
        try {
            connection = DriverManager.getConnection(URL, USERNAME, PASSWORD);
            String call = "{CALL EszkozKategoria_hozzaadasa(?, ?, ?, ?, ?, ?, ?)}";

            CallableStatement callableStatement = connection.prepareCall(call);
            callableStatement.setString("device_category_name",categoryName);
            callableStatement.setInt("qualification",qualificationID); // INCOMPLETE PROCEDURE
            callableStatement.setString("period",categoryPeriod);
            callableStatement.setInt("norm_time",Integer.parseInt(categoryNormalTime));
            callableStatement.setString("steps_descrip",specification);
            callableStatement.setString("parent",parent);

            callableStatement.registerOutParameter("resultcode", java.sql.Types.INTEGER);

            callableStatement.execute();

            resCode = callableStatement.getInt("resultCode");
            System.out.println("[DATABASE]: Called Eszkoz_hozzaadasa, result: " + resCode);
        } 
        catch (SQLException ex) {
            System.err.println("[ERROR]: Error occured in function addCategory: " + ex + "\nStack trace: ");
            ex.printStackTrace();
            resCode =  1;
        } 
        catch (NumberFormatException ex) {
            System.err.println("[ERROR]: Invalid parse in function addCategory: " + ex + "\nStack trace: ");
            ex.printStackTrace();
            resCode =  2;
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
                resCode =  1;
            }
        }   
        return resCode;
    }

    public String[] listCategory()
    {
        String[] res;
        List<String> dataList = new ArrayList<>(); 

        try {
            connection = DriverManager.getConnection(URL, USERNAME, PASSWORD);
            
            String call = "{CALL Kategoriak_listazasa()}";
            CallableStatement callableStatement = connection.prepareCall(call);
            ResultSet resultSet = callableStatement.executeQuery();
            
            while (resultSet.next()) {
                dataList.add(resultSet.getString(1));
            }

            res = new String[dataList.size()];
            res = dataList.toArray(res);
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

    public int addQualication(String qualificationName)
    {
        int resCode = 1;
        try {
            connection = DriverManager.getConnection(URL, USERNAME, PASSWORD);
            String call = "{CALL Kepesites_hozzaadasa(?, ?)}";
            CallableStatement callableStatement = connection.prepareCall(call);
            callableStatement.setString("qualification_name",qualificationName);
            callableStatement.registerOutParameter("resultcode",java.sql.Types.INTEGER);
            callableStatement.execute();
            resCode = callableStatement.getInt("resultcode");
            System.out.println("[DATABASE]: called Kepesites_hozzaadasa, result: " + resCode);
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

        return resCode;
    }

    public Qualification.QualificationData[] listQualification()
    {
        Qualification.QualificationData[] res;
        List<Qualification.QualificationData> dataList = new ArrayList<>(); 

        try {
            connection = DriverManager.getConnection(URL, USERNAME, PASSWORD);
            
            String call = "{CALL Kepesitesek_listazasa()}";
            CallableStatement callableStatement = connection.prepareCall(call);
            ResultSet resultSet = callableStatement.executeQuery();
            
            while (resultSet.next()) {
                Qualification.QualificationData temp = new Qualification.QualificationData();
                temp.setQualificationID(resultSet.getInt(1));
                temp.setQualificationName(resultSet.getString(2));
                dataList.add(temp);
            }


            res = new Qualification.QualificationData[dataList.size()];
            res = dataList.toArray(res);

        } 
        catch (SQLException ex) {
            System.err.println("[ERROR]: Error occured in function listQualification: " + ex + "\nStack trace: ");
            ex.printStackTrace();
            res = new Qualification.QualificationData[0];
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


    public int addWorker(String lastName, String firstName, int qualificationID, String username, String password) {

        int resCode;
        try {
            connection = DriverManager.getConnection(URL, USERNAME, PASSWORD);
            String call = "{CALL Karbantarto_hozzaadasa(?,?,?,?)}";

            CallableStatement callableStatement = connection.prepareCall(call);
            callableStatement.setString("last_name", lastName); // INCOMPLETE PROCEDURE
            callableStatement.setString("first_name", firstName); // INCOMPLETE PROCEDURE
            callableStatement.setInt("qualification", qualificationID); // INCOMPLETE PROCEDURE
            callableStatement.setString("username", username);
            callableStatement.setString("password", password);

            callableStatement.registerOutParameter("resultcode", java.sql.Types.INTEGER);

            callableStatement.execute();

            resCode = callableStatement.getInt("resultCode");
            System.out.println("[DATABASE]: Called Karbantarto_hozzaadasa, result: " + resCode);

        } 
        catch (SQLException ex) {
            System.err.println("[ERROR]: Error occured in function addWorker: " + ex + "\nStack trace: ");
            ex.printStackTrace();
            resCode = 1;
        } 
        finally {
            try {
                if (connection != null) {
                    connection.close();
                }
            } 
            catch (SQLException ex) {
                System.err.println("[ERROR]: Error occured in function addWorker when try to close connection: " + ex + "\nStack trace: ");
                ex.printStackTrace();
                resCode = 1;
            }
        }   

        return resCode;
    }

    public Worker.WorkerData[] listWorker()
    {
        Worker.WorkerData[] res;
        List<Worker.WorkerData> dataList = new ArrayList<>(); 

        try {
            connection = DriverManager.getConnection(URL, USERNAME, PASSWORD);
            
            String call = "{CALL Karbantartok_listazasa()}";
            CallableStatement callableStatement = connection.prepareCall(call);
            ResultSet resultSet = callableStatement.executeQuery();
            
            while (resultSet.next()) {
                Worker.WorkerData temp = new Worker.WorkerData();
                temp.setLastName(resultSet.getString(2));
                temp.setFirstName(resultSet.getString(3));
                temp.setQualificationID(resultSet.getInt(4)); // INCOMPLETE PROCEDURE
                dataList.add(temp);
            }

            res = new Worker.WorkerData[dataList.size()];
            res = dataList.toArray(res);

        } 
        catch (SQLException ex) {
            System.err.println("[ERROR]: Error occured in function listWorker: " + ex + "\nStack trace: ");
            ex.printStackTrace();
            res = new Worker.WorkerData[0];
        } 
        finally {
            try {
                if (connection != null) {
                    connection.close();
                }
            } 
            catch (SQLException ex) {
                System.err.println("[ERROR]: Error occured in function listWorker when try to close connection: " + ex + "\nStack trace: ");
                ex.printStackTrace();
            }
        }   

        return res;
    }

    public Device.DeviceData[] listDevice()
    {
        Device.DeviceData[] res;
        List<Device.DeviceData> dataList = new ArrayList<>(); 

        try {
            connection = DriverManager.getConnection(URL, USERNAME, PASSWORD);
            
            String call = "{CALL Eszkozok_listazasa()}";
            CallableStatement callableStatement = connection.prepareCall(call);
            ResultSet resultSet = callableStatement.executeQuery();
            
            while (resultSet.next()) {
                Device.DeviceData temp = new Device.DeviceData();
                temp.setDeviceID(resultSet.getInt(1));
                temp.setDeviceName(resultSet.getString(2));
                temp.setDeviceCategoryName(resultSet.getString(3));
                temp.setDeviceDescription(resultSet.getString(4));
                temp.setDeviceLocation(resultSet.getString(5));
                dataList.add(temp);
            }

            res = new Device.DeviceData[dataList.size()];
            res = dataList.toArray(res);
        } 
        catch (SQLException ex) {
            System.err.println("[ERROR]: Error occured in function listDevice: " + ex + "\nStack trace: ");
            ex.printStackTrace();
            res = new Device.DeviceData[0];
        } 
        finally {
            try {
                if (connection != null) {
                    connection.close();
                }
            } 
            catch (SQLException ex) {
                System.err.println("[ERROR]: Error occured in function listDevice when try to close connection: " + ex + "\nStack trace: ");
                ex.printStackTrace();
            }
        }   

        return res;
    }

    public int addMaintenance(int deviceID, String taskName, String specification, String normTime) {
        int resCode = 1;
        
        try {
            connection = DriverManager.getConnection(URL, USERNAME, PASSWORD);
            String call = "{CALL Feladat_hozzaadasa(?,?,?,?,?,?,?,?,?)}";

            CallableStatement callableStatement = connection.prepareCall(call);
            callableStatement.setInt("device_ID",deviceID);
            callableStatement.setString("task_name",taskName);
            callableStatement.setInt("status",0);
            callableStatement.setString("no_justification",null);
            // TODO: this needs to be null somehow
            callableStatement.setInt("maint_specialist_ID",1);
            callableStatement.setString("task_start",null);
            callableStatement.setString("task_end",null);
            callableStatement.setString("norm_time",normTime);
            callableStatement.setString("steps_descrip",specification);

            callableStatement.execute();

            // this is like OMEGA BAD... needs fixing
            // TODO: add result to the server procedure thingy
            resCode = 0;
            System.out.println("[DATABASE]: Called Feladat_hozzaadasa, result: " + resCode);

        } 
        catch (SQLException ex) {
            System.err.println("[ERROR]: Error occured in function addTask: " + ex + "\nStack trace: ");
            ex.printStackTrace();
            resCode = 1;
        } 
        finally {
            try {
                if (connection != null) {
                    connection.close();
                }
            } 
            catch (SQLException ex) {
                System.err.println("[ERROR]: Error occured in function addWorker when try to close connection: " + ex + "\nStack trace: ");
                ex.printStackTrace();
                resCode = 1;
            }
        }   

        return resCode;
    }

    public Maintenance.MaintenanceData[] listMaintenance() {
        Maintenance.MaintenanceData[] res;
        List<Maintenance.MaintenanceData> dataList = new ArrayList<>(); 

        try {
            connection = DriverManager.getConnection(URL, USERNAME, PASSWORD);
            
            String call = "{CALL Feladatok_listazasa()}";
            CallableStatement callableStatement = connection.prepareCall(call);
            ResultSet resultSet = callableStatement.executeQuery();
            
            while (resultSet.next()) {
                Maintenance.MaintenanceData temp = new Maintenance.MaintenanceData();
                temp.deviceID = Integer.toString(resultSet.getInt(1));
                temp.maintenanceTaskID = Integer.toString(resultSet.getInt(2));
                temp.maintenanceTaskName = resultSet.getString(3);
                temp.state = Integer.toString(resultSet.getInt(4));
                temp.workerID = Integer.toString(resultSet.getInt(6));
                temp.startDate = resultSet.getString(7);
                temp.finishDate = resultSet.getString(8);
                temp.normTime = resultSet.getString(9);
                temp.specification = resultSet.getString(10);
                temp.deviceName = resultSet.getString(11);
                temp.deviceLocation = resultSet.getString(14);
                dataList.add(temp);
            }

            res = new Maintenance.MaintenanceData[dataList.size()];
            res = dataList.toArray(res);
            System.out.println("[DATABASE]: Called Feladatok_listazasa");
        } 
        catch (SQLException ex) {
            System.err.println("[ERROR]: Error occured in function listMaintenance: " + ex + "\nStack trace: ");
            ex.printStackTrace();
            res = new Maintenance.MaintenanceData[0];
        } 
        finally {
            try {
                if (connection != null) {
                    connection.close();
                }
            } 
            catch (SQLException ex) {
                System.err.println("[ERROR]: Error occured in function listDevice when try to close connection: " + ex + "\nStack trace: ");
                ex.printStackTrace();
            }
        }   
        return res;
        
    }

    public void addTimerTask(String categoryName, Date referenceDate) {
        try {
            connection = DriverManager.getConnection(URL, USERNAME, PASSWORD);
            String call = "{CALL Idoszakos_feladat_hozzaadasa(?,?,?,?,?,?,?,?,?)}";

            CallableStatement callableStatement = connection.prepareCall(call);
            callableStatement.setString("device_category_name",categoryName);
            callableStatement.setDate("ref_date",referenceDate);
            callableStatement.setString("task_name",null);
            callableStatement.setInt("status",0);
            callableStatement.setInt("maint_specialist_ID",1);
            callableStatement.setString("task_start",null);
            callableStatement.setString("task_end",null);
            callableStatement.setString("norm_time",null);
            callableStatement.setString("steps_descrip",null);

            callableStatement.execute();
            System.out.println("[DATABASE]: Called Idoszakos_feladat_hozzaadasa category name:" + categoryName + " referenceDate: " + referenceDate.toString());
        } 
        catch (SQLException ex) {
            System.err.println("[ERROR]: Error occured in function addTimerTask: " + ex + "\nStack trace: ");
            ex.printStackTrace();
        } 
        finally {
            try {
                if (connection != null) {
                    connection.close();
                }
            } 
            catch (SQLException ex) {
                System.err.println("[ERROR]: Error occured in function addWorker when try to close connection: " + ex + "\nStack trace: ");
                ex.printStackTrace();
            }
        }   
    }

    public TimerTask.TimerTaskData[] listTimerTasks() {
        TimerTask.TimerTaskData[] res;
        List<TimerTask.TimerTaskData> dataList = new ArrayList<>(); 

        try {
            connection = DriverManager.getConnection(URL, USERNAME, PASSWORD);
            
            String call = "{CALL Idoszakos_feladat_listazasa()}";
            CallableStatement callableStatement = connection.prepareCall(call);
            ResultSet resultSet = callableStatement.executeQuery();
            
            while (resultSet.next()) {
                TimerTask.TimerTaskData temp = new TimerTask.TimerTaskData();
                temp.id = resultSet.getInt(1);
                temp.categoryName = resultSet.getString(2);
                temp.referenceDate = resultSet.getDate(10);
                dataList.add(temp);
            }

            res = new TimerTask.TimerTaskData[dataList.size()];
            res = dataList.toArray(res);
            System.out.println("[DATABASE]: Called Feladatok_listazasa");
        } 
        catch (SQLException ex) {
            System.err.println("[ERROR]: Error occured in function listMaintenance: " + ex + "\nStack trace: ");
            ex.printStackTrace();
            res = new TimerTask.TimerTaskData[0];
        } 
        finally {
            try {
                if (connection != null) {
                    connection.close();
                }
            } 
            catch (SQLException ex) {
                System.err.println("[ERROR]: Error occured in function listDevice when try to close connection: " + ex + "\nStack trace: ");
                ex.printStackTrace();
            }
        }   
        return res;
    }

    public Category.CategoryData[] listCategoryData() {
        Category.CategoryData[] res;
        List<Category.CategoryData> dataList = new ArrayList<>(); 

        try {
            connection = DriverManager.getConnection(URL, USERNAME, PASSWORD);
            
            String call = "SELECT * FROM EszkozKategoria";
            CallableStatement callableStatement = connection.prepareCall(call);
            ResultSet resultSet = callableStatement.executeQuery();
            
            while (resultSet.next()) {
                Category.CategoryData temp = new Category.CategoryData();
                temp.categoryName = resultSet.getString(1);
                temp.period = resultSet.getString(3);
                temp.normTime = resultSet.getTime(4).getHours();
                temp.stepsDescription = resultSet.getString(5);
                temp.parent = resultSet.getString(6);
                dataList.add(temp);
            }

            res = new Category.CategoryData[dataList.size()];
            res = dataList.toArray(res);
            System.out.println("[DATABASE]: Listing category attributes");
        } 
        catch (SQLException ex) {
            System.err.println("[ERROR]: Error occured in function listMaintenance: " + ex + "\nStack trace: ");
            ex.printStackTrace();
            res = new Category.CategoryData[0];
        } 
        finally {
            try {
                if (connection != null) {
                    connection.close();
                }
            } 
            catch (SQLException ex) {
                System.err.println("[ERROR]: Error occured in function listDevice when try to close connection: " + ex + "\nStack trace: ");
                ex.printStackTrace();
            }
        }   
        return res;       
    }

    public void setReferenceDate(int taskId, Date updatedReference) {
        try {
            connection = DriverManager.getConnection(URL, USERNAME, PASSWORD);
            
            String call = "UPDATE IdoszakosFeladat SET Referencia_datum=? WHERE IdoszakosFeladat_ID = ?";
            CallableStatement callableStatement = connection.prepareCall(call);

            callableStatement.setInt(2,taskId);
            callableStatement.setDate(1,updatedReference);

            callableStatement.execute();

            System.out.println("[DATABASE]: Setting reference date of " + taskId + " to:  " + updatedReference.toString());
        } 
        catch (SQLException ex) {
            System.err.println("[ERROR]: Error occured in function listMaintenance: " + ex + "\nStack trace: ");
            ex.printStackTrace();
        } 
        finally {
            try {
                if (connection != null) {
                    connection.close();
                }
            } 
            catch (SQLException ex) {
                System.err.println("[ERROR]: Error occured in function listDevice when try to close connection: " + ex + "\nStack trace: ");
                ex.printStackTrace();
            }
        }   
    }

}
