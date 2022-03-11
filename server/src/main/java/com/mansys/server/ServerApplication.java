package com.mansys.server;

import com.mansys.server.backend.Authenticate;
import com.mansys.server.backend.Category;
import com.mansys.server.backend.Device;
import com.mansys.server.backend.Qualification;
import com.mansys.server.backend.Server;
import com.mansys.server.data.DatabaseManager;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * Main resource controller for the server backand. Uses a Server Interface implementation to handle
 * requests from the clients and sends back HTTP responses.
 * @author Tálas Martin
 * @author Tóth Bálint
 */

@RestController
@SpringBootApplication
public class ServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServerApplication.class, args);
		
		// DatabaseManager dbm = DatabaseManager.getInstance();
		// dbm.testProcedure();
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

	@PostMapping("/device")
	public ResponseEntity<?> addDevice(@RequestBody Device.Request request) {
		Device.Response response = Server.getInstance().handleDevice(request);
		return ResponseEntity.ok(response);
	}

	@PostMapping("/category")
	public ResponseEntity<?> addCategory(@RequestBody Category.Request request) {
		Category.Response response = Server.getInstance().handleCategory(request);
		return ResponseEntity.ok(response);
	}

	@PostMapping("qualification")
	public ResponseEntity<?> addQualification(@RequestBody Qualification.Request request) {
		Qualification.Response response = Server.getInstance().handleQualification(request);
		return ResponseEntity.ok(response);
	}

}
