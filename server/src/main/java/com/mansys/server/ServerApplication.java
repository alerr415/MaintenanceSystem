package com.mansys.server;

import com.mansys.server.backend.Authenticate;
import com.mansys.server.backend.Category;
import com.mansys.server.backend.Device;
import com.mansys.server.backend.Qualification;
import com.mansys.server.backend.Server;
import com.mansys.server.data.DatabaseManager;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
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
		
		//LIST CATEGORY DEBUG
		//DatabaseManager dbm = DatabaseManager.getInstance();
		//dbm.listCategory();
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

	//POST
	@PostMapping("/authenticate")
	public ResponseEntity<?> authenticate(@RequestBody Authenticate.Request request) {
		Authenticate.Response response = Server.getInstance().handleAuthenticate(request);
		// get the result so the cookiefication can be determined
		if (response.getErrorCode() == Server.getInstance().getRescodeOK()) {
			// in this case we request a cookie
			ResponseCookie cookie = Server.getInstance().generateSession(request.getUsername());
			return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE,cookie.toString()).body(response);
		} else {
			return ResponseEntity.ok(response);
		}
	}

// {"deviceID":69, "deviceCategoryID":420, "deviceName":"vibrator", "deviceDescription":"not found", "deviceLocation":"yo mama"}

	@PostMapping("/device")
	public ResponseEntity<?> addDevice(@RequestBody Device.Request request
									 , @CookieValue(name="session-id",defaultValue="0") String sessId) {
		// check if the session is valid -> we can handle the request
		if (!Server.getInstance().isSessionValid(Integer.parseInt(sessId))) {
			System.out.println("[SERVER APPLICATION / Device] Invalid session: " + sessId);
			return ResponseEntity.badRequest().build(); // TEMPORARY, some general invalid session is needed
			//TODO: implement response for invalid sessions
		}

		Device.Response response = Server.getInstance().handleDevice(request);

		if (response.getErrorCode() == Server.getInstance().getRescodeOK()) {
			ResponseCookie refreshed = Server.getInstance().refreshSession(Integer.parseInt(sessId));
			return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE,refreshed.toString()).body(response);
		} else {
			return ResponseEntity.ok(response);
		}
	}

	@PostMapping("/category")
	public ResponseEntity<?> addCategory(@RequestBody Category.Request request
									   , @CookieValue(name="session-id",defaultValue="default") String sessId) {
		if (!Server.getInstance().isSessionValid(Integer.parseInt(sessId))) {
			System.out.println("[SERVER APPLICATION / CATEGORY] Invalid session: " + sessId);
			return ResponseEntity.badRequest().build(); // TEMPORARY, some general invalid session is needed
		}

		Category.Response response = Server.getInstance().handleCategory(request);

		if (response.getErrorCode() == Server.getInstance().getRescodeOK()) {
			ResponseCookie refreshed = Server.getInstance().refreshSession(Integer.parseInt(sessId));
			return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE,refreshed.toString()).body(response);
		} else {
			return ResponseEntity.ok(response);
		}
	}

	@Deprecated
	@PostMapping("/qualification")
	public ResponseEntity<?> addQualification(@RequestBody Qualification.Request request
											, @CookieValue(name="session-id",defaultValue="default") String sessId) {
		if (!Server.getInstance().isSessionValid(Integer.parseInt(sessId))) {
			return ResponseEntity.badRequest().build(); // TEMPORARY, some general invalid session is needed
		}

		Qualification.Response response = Server.getInstance().handleQualification(request);

		if (response.getErrorCode() == Server.getInstance().getRescodeOK()) {
			ResponseCookie refreshed = Server.getInstance().refreshSession(Integer.parseInt(sessId));
			return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE,refreshed.toString()).body(response);
		} else {
			return ResponseEntity.ok(response);
		}
	}

	//GET
	@GetMapping("/category")
	public ResponseEntity<?> getCategories(@CookieValue(name="session-id",defaultValue="default") String sessId) {
		if (!Server.getInstance().isSessionValid(Integer.parseInt(sessId))) {
			System.out.println("[SERVER APPLICATION / CATEGORY] Invalid session: " + sessId);
			return ResponseEntity.badRequest().build(); // TEMPORARY, some general invalid session is needed
		}

		Category.GetResponse response = Server.getInstance().handleCategoryList();

		if (response.getResultCode() == Server.getInstance().getRescodeOK()) {
			ResponseCookie refreshed = Server.getInstance().refreshSession(Integer.parseInt(sessId));
			return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE,refreshed.toString()).body(response);
		} else {
			return ResponseEntity.ok(response);
		}
	}

}
