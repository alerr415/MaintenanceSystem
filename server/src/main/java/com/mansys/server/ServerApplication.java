package com.mansys.server;

import com.mansys.server.backend.Authenticate;
import com.mansys.server.backend.Server;
import com.mansys.server.data.DatabaseManager;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@SpringBootApplication
public class ServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServerApplication.class, args);
		
		DatabaseManager dbm = DatabaseManager.getInstance();
		dbm.testProcedure();
	}

	@GetMapping("/hello")
	public String hello() {
		return "Hello World";
	}

	/**
	 * Handle for an authentication request.
	 * Tóth Bálint
	 * @param request the POST HTTP-request's json body
	 * @return a http response entity with the result json
	 */
	@PostMapping("/authenticate")
	public ResponseEntity<?> authenticate(@RequestBody Authenticate.Request request) {
		Authenticate.Response response = Server.getInstance().handleAuthenticate(request);
		return ResponseEntity.ok(response);
	}

}
