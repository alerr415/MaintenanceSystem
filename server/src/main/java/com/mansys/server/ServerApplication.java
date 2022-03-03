package com.mansys.server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServerApplication.class, args);
		DatabaseManager dbm = DatabaseManager.getInstance();
		System.out.println("asd");
		dbm.testProcedure();
	}

}
