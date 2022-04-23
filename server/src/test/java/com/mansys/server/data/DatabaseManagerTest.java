package com.mansys.server.data;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.sql.Date;

import com.mansys.server.backend.Category;
import com.mansys.server.backend.Device;
import com.mansys.server.backend.Maintenance;
import com.mansys.server.backend.Worker;
import com.mansys.server.backend.Qualification;
import com.mansys.server.backend.TimerTask;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import javafx.util.Pair;

@SpringBootTest
class DatabaseManagerTest {

	@Test
	void contextLoads() {
        boolean fail = false;
        try {
            DatabaseManager dbm = DatabaseManager.getInstance(); 
        } catch (Exception e) {
            fail = true;
        }
        assertFalse(fail);

	}

    @Test
    void callLogin() {
        Pair<Integer,String> ok = DatabaseManager.getInstance().authenticateUser("gonzalez","gonzalez321");
        assertEquals(0,ok.getKey());
        assertEquals("karbantarto", ok.getValue());
        Pair<Integer,String> fail = DatabaseManager.getInstance().authenticateUser("not_me", "invalid69");
        assertEquals(1, fail.getKey());
    }

    @Test
    void callAddDevice() {
        int ok = DatabaseManager.getInstance().addDevice("lavalampa","lampak","kanócos olajlámpa","KK407B");
        assertEquals(0,ok);
        int fail = DatabaseManager.getInstance().addDevice("vibrator","sexual accessories","magic wand with a power on button","you know exactly where it is"); // nonexisting category
        assertEquals(400,fail);
    }

    @Test
    void callAddCategory() {
        //int ok = DatabaseManager.getInstance().addCategory("tesztkategoria","gepesztechnikus","eves", "1","Ellenorizze a trafo szigeteleset","hegesztogepek");
        //assertEquals(0,ok);
    }

    @Test
    void callListCategory() {
        String[] categories = DatabaseManager.getInstance().listCategory();
        assertNotNull(categories);
    }

    @Test
    void callListQualification() {
        Qualification.QualificationData[] qualifications = DatabaseManager.getInstance().listQualification();
        assertNotNull(qualifications);
    }

    @Test
    void callAddWorker() {
        int ok = DatabaseManager.getInstance().addWorker("Babinéni", "Sajtos", 1);
        assertEquals(0,ok);
    }

    @Test
    void callListWorker() {
        Worker.WorkerData[] workers = DatabaseManager.getInstance().listWorker();
        assertNotNull(workers);
    }

    @Test
    void callLisDevice() {
        Device.DeviceData[] devices = DatabaseManager.getInstance().listDevice();
        assertNotNull(devices);
    }

    @Test
    void callAddQualification() {
        int ok = DatabaseManager.getInstance().addQualication("Szexuális segédeszköz síkosító szakember");
        assertEquals(ok,0);
    }

    @Test
    void callAddMaintenanceTask() {
        int ok = DatabaseManager.getInstance().addMaintenance(1,"fix it","1, 2, 3, 4","12:00");
        assertEquals(0,ok);
    }

    @Test
    void callListMaintenance() {
        Maintenance.MaintenanceData[] maintenances = DatabaseManager.getInstance().listMaintenance();
        assertNotNull(maintenances);
    }


    @Test
    void callAddTimerTask() {
        DatabaseManager.getInstance().addTimerTask("lampak",new Date(System.currentTimeMillis()));
    }

    @Test
    void callListTimerTask() {
        TimerTask.TimerTaskData[] timerTasks = DatabaseManager.getInstance().listTimerTasks();
        assertNotNull(timerTasks);
        for (TimerTask.TimerTaskData data : timerTasks) {
            System.out.println("Timer Task (" + data.categoryName + "," + data.referenceDate.toString() + ")");
        }
    }

    @Test
    void callListCategoryData() {
        Category.CategoryData[] categoryData = DatabaseManager.getInstance().listCategoryData();
        assertNotNull(categoryData);
        for (Category.CategoryData data : categoryData) {
            System.out.println("Category (" + data.categoryName + ", " 
                                            + data.period + ", " 
                                            + data.normTime + ","
                                            + data.parent + ")");
        }
    }

    @Test
    void callSetReferenceDate() {
        DatabaseManager.getInstance().setReferenceDate(1, new Date(System.currentTimeMillis() + (1000 * 60 * 60 * 24 * 10)));
    }
}
