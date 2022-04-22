package com.mansys.server.backend;

import java.util.LinkedList;

import com.mansys.server.data.DatabaseManager;
import com.mansys.server.backend.Device;

/**
 * This class is used for handle the timer tasks, periods..
 * 
 * @author Tálas Martin
 */
public class BusinessLogic {

    //-----------------------------------------[ VARIABLES ]------------------------------------------

    private DatabaseManager databaseManager;
    private Device.DeviceData[] deviceDataList;

    private LinkedList<TimerTask.TimerTaskData> timerTaskList;
    private LinkedList<Category.CategoryData> categoryList;


    //------------------------------------------------------------------------------------------------
    //----------------------------------[ SINGLETON DESIGN PATTERN ]----------------------------------
    
    private static BusinessLogic singleton_instance = null;
    
    private BusinessLogic(){
        databaseManager = DatabaseManager.getInstance();

        timerTaskList = new LinkedList<>();
        categoryList = new LinkedList<>();    
    }
 
    public static BusinessLogic getInstance(){
        if (singleton_instance == null){
            singleton_instance = new BusinessLogic();
        }

        return singleton_instance;
    }

    //------------------------------------------------------------------------------------------------
    //---------------------------------------[ EVENT FUNCTIONS ]--------------------------------------


    public void syncTimerTasksToCategories() {

    }

    public void scanTimerTasks() {
        
    }

    //------------------------------------------------------------------------------------------------
}
