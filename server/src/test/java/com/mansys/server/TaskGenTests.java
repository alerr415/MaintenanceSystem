package com.mansys.server;

import com.mansys.server.backend.BusinessLogic;

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

    }
}
