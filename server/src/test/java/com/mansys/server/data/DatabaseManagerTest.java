package com.mansys.server.data;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class DatabaseManagerTest {

	@Test
	void contextLoads() {
	}

    @Test
    void createSingletonInstance(){
        DatabaseManager dbm = DatabaseManager.getInstance();
        System.out.println(dbm.URL);
        System.out.println(dbm.connectionIsActive);
    }

}
