package com.mansys.server.data;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;

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
        int ok = DatabaseManager.getInstance().addCategory("ivhegesztok","gepesztechnikus","eves","2023-03-22 16:00:00","Ellenorizze a trafo szigeteleset","hegesztogepek");
        assertEquals(0,ok);
    }

    @Test
    void callListCategory() {
        String[] categories = DatabaseManager.getInstance().listCategory();
        assertNotNull(categories);
    }

    @Test
    void callListQualification() {
        String[] qualifications = DatabaseManager.getInstance().listQualification();
        assertNotNull(qualifications);
    }

}
