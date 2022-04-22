package com.mansys.server.backend;

import java.util.LinkedList;

/**
 * This class is used for handle the timer tasks, periods..
 * 
 * @author Tálas Martin
 */
public class BusinessLogic {

    //-----------------------------------------[ VARIABLES ]------------------------------------------

    private LinkedList<TimerTask.TimerTaskData> timerTaskList;
    private LinkedList<Category.CategoryData> categoryList;

    //------------------------------------------------------------------------------------------------
    //----------------------------------[ SINGLETON DESIGN PATTERN ]----------------------------------
    
    private static BusinessLogic singleton_instance = null;
    
    private BusinessLogic(){
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
