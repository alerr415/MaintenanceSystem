package com.mansys.server;

import java.sql.Date;

import com.mansys.server.backend.BusinessLogic;
import com.mansys.server.backend.Category;

import org.junit.jupiter.api.Test;

public class TaskGenTests {
    @Test
    void syncTest() {
        BusinessLogic.getInstance().syncTimerTasksToCategories();
    }   

    @Test
    void genTest() {
        BusinessLogic.getInstance().scanTimerTasks();
    }

    @Test
    void incrementTest() {
        Date now = new Date(System.currentTimeMillis());
        Date future = BusinessLogic.getInstance().offset(now,Category.CategoryData.Period.YEARLY);
        System.out.println(future.toString());
    }
}
