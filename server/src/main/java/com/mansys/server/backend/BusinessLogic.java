package com.mansys.server.backend;

import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.LinkedList;
import java.util.List;

import com.mansys.server.data.DatabaseManager;

import static com.mansys.server.backend.Device.DeviceData;
import static com.mansys.server.backend.TimerTask.TimerTaskData;
import static com.mansys.server.backend.Category.CategoryData;
import static com.mansys.server.backend.Category.CategoryData.Period;

/**
 * This class is used for handle the timer tasks, periods..
 * 
 * @author Tálas Martin
 */
public class BusinessLogic {

    //-----------------------------------------[ VARIABLES ]------------------------------------------

    private DatabaseManager databaseManager;
    private DeviceData[] deviceDataList;

    private TimerTaskData[] timerTaskList;
    private CategoryData[] categoryList;


    //------------------------------------------------------------------------------------------------
    //----------------------------------[ SINGLETON DESIGN PATTERN ]----------------------------------
    
    private static BusinessLogic singleton_instance = null;
    
    private BusinessLogic() {
        databaseManager = DatabaseManager.getInstance();
        syncData();
    }
 
    public static BusinessLogic getInstance() {
        if  (singleton_instance == null) {
            singleton_instance = new BusinessLogic();
        }

        return singleton_instance;
    }

    private void syncData() {
        deviceDataList = databaseManager.listDevice();
        timerTaskList = databaseManager.listTimerTasks();
        categoryList = databaseManager.listCategoryData();
    }
    //------------------------------------------------------------------------------------------------
    //---------------------------------------[ EVENT FUNCTIONS ]--------------------------------------


    public void syncTimerTasksToCategories() {
        syncData();
        for (Category.CategoryData categoryData : categoryList) {
            if (!search(categoryData, timerTaskList)) {
                TimerTaskData taskData;
                taskData = new TimerTaskData();
                taskData.categoryName = categoryData.categoryName;
                taskData.referenceDate = new Date(System.currentTimeMillis());
                databaseManager.addTimerTask(taskData.categoryName,taskData.referenceDate);
            }
        }
    }

    public void scanTimerTasks() {
        syncData();
        // da algorithm:
        // 1. iterate through the timer tasks
        // 2. if the task's reference date is today
        // 2 + i. increment the reference
        // 3. get all the devices of the category
        // 4. for all items of this list create a database task entry with the category's parameters
        // 5. be happy and drink beer
        for (TimerTaskData task : timerTaskList) {
            SimpleDateFormat cmpFormat = new SimpleDateFormat("yyyyMMdd");
            if (cmpFormat.format(new Date(System.currentTimeMillis())).equals(cmpFormat.format(task.referenceDate))) {
                // at this point we should know the category
                CategoryData category = categoryOfTask(task);
                Date updatedDate = offset(task.referenceDate,category.period);
                task.referenceDate = updatedDate;
                databaseManager.setReferenceDate(task.id,updatedDate);

                List<DeviceData> devices = devicesOfCategory(category);      
                for (DeviceData device : devices) {
                    databaseManager.addMaintenance(device.getDeviceID()
                                                 , "Automatikusan generált"
                                                 , category.stepsDescription
                                                 , String.valueOf(category.normTime)
                    );
                }
            }
        }
    }

    private Date offset(Date reference, String increment) {
        long incrementMillis = 0;
        long day = 1000 * 60 * 60 * 24;
        switch (increment) {
            case Period.DAILY:
                incrementMillis = day;
                break;
            case Period.WEEKLY:
                incrementMillis = day * 7;
                break;
            case Period.MONTHLY:
                incrementMillis = day * 30;
                break;
            case Period.QUARTER_YEARLY:
                incrementMillis = day * 30 * 3;
                break;
            case Period.HALF_YEARLY:
                incrementMillis = day * 30 * 6;
                break;
            case Period.YEARLY:
                incrementMillis = day * 365;
                break;
            default:
                break;
        }
        return new Date(reference.getTime() + incrementMillis);
    }

    private CategoryData categoryOfTask(TimerTaskData task) {
        for (CategoryData c : categoryList) {
            if (c.categoryName.equals(task.categoryName)) {
                return c;
            }
        }
        // kinda illegal, but good for now
        return null;
    }

    private List<DeviceData> devicesOfCategory(CategoryData category) {
        LinkedList<DeviceData> devices = new LinkedList<>();
        for (DeviceData d : deviceDataList) {
            if (d.getDeviceCategoryName().equals(category.categoryName))
                devices.add(d);
        }
        return devices;
    }

    private boolean search(CategoryData data,TimerTaskData[] list) {

        for (TimerTaskData timerTaskData : list) {
            if (data.categoryName.equals(timerTaskData.categoryName))
            {
                return true;
            }
        }
        return false;
    }
    //------------------------------------------------------------------------------------------------
}
