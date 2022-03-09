package com.mansys.server;

import com.mansys.server.data.DatabaseManager;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServerApplication.class, args);
		
		DatabaseManager dbm = DatabaseManager.getInstance();
		dbm.testProcedure();
	}

}
