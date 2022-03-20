package com.mansys.server.data;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;

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

}
