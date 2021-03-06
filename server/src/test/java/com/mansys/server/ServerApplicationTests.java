package com.mansys.server;

import com.mansys.server.backend.Category;
import com.mansys.server.backend.Server;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class ServerApplicationTests {

	@Test
	void contextLoads() {
	}

	@Test
	void testAddCategory()
	{
		Category.Request req = new Category.Request();
		req.setCategoryName("Test Device");
		req.setParent("");
		req.setCategoryNormalTime("1");
		req.setCategoryPeriod("Havi");
		req.setQualificationID(5);
		req.setSpecification("Easy to use!");

		Server serv = Server.getInstance();
		serv.handleCategory(req);
	}

}
