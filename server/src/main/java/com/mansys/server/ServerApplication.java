package com.mansys.server;

import java.util.Timer;
import java.util.TimerTask;

import com.mansys.server.backend.Assignment;
import com.mansys.server.backend.Authenticate;
import com.mansys.server.backend.Category;
import com.mansys.server.backend.Device;
import com.mansys.server.backend.Maintenance;
import com.mansys.server.backend.Qualification;
import com.mansys.server.backend.Server;
import com.mansys.server.backend.State;
import com.mansys.server.backend.Worker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
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

		// sart the timer
		TimerTask updateTask = new TimerTask() {
			public void run() {
				System.out.println("[SCHEDULER] Updating timer tasks");
				Server.getInstance().updateTimerTasks();
			}
		};
		Timer t = new Timer("Scheduler");
		t.scheduleAtFixedRate(updateTask, 1000*5,Server.UPDATE_DELAY);


		SpringApplication.run(ServerApplication.class, args);
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
									   , @CookieValue(name="session-id",defaultValue="0") String sessId) {
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

	@PostMapping("/qualification")
	public ResponseEntity<?> addQualification(@RequestBody Qualification.Request request
											, @CookieValue(name="session-id",defaultValue="0") String sessId) {
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
	public ResponseEntity<?> getCategories(@CookieValue(name="session-id",defaultValue="0") String sessId) {
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

	@GetMapping("/qualification")
	public ResponseEntity<?> getQualifications(@CookieValue(name="session-id",defaultValue="0") String sessId) {
		if (!Server.getInstance().isSessionValid(Integer.parseInt(sessId))) {
			System.out.println("[SERVER APPLICATION / QUALIFICATIONS] Invalid session: " + sessId);
			return ResponseEntity.badRequest().build(); // TEMPORARY, some general invalid session is needed
		}

		Qualification.GetResponse response = Server.getInstance().handleQualificationList();

		if (response.getResultCode() == Server.getInstance().getRescodeOK()) {
			ResponseCookie refreshed = Server.getInstance().refreshSession(Integer.parseInt(sessId));
			return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE,refreshed.toString()).body(response);
		} else {
			return ResponseEntity.ok(response);
		}
	}

	@PostMapping("/worker")
	public ResponseEntity<?> addWorker(@RequestBody Worker.Request request,
									   @CookieValue(name="session-id", defaultValue="0") String sessId) {
		if (!Server.getInstance().isSessionValid(Integer.parseInt(sessId))) {
			System.out.println("[SERVER APPLICATION / CATEGORY] Invalid session: " + sessId);
			return ResponseEntity.badRequest().build(); 
		}

		Worker.Response response = Server.getInstance().handleWorker(request);

		if (response.getErrorCode() == Server.getInstance().getRescodeOK()) {
			ResponseCookie refreshed = Server.getInstance().refreshSession(Integer.parseInt(sessId));
			return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE,refreshed.toString()).body(response);
		} else {
			return ResponseEntity.ok(response);
		}
	}

	@GetMapping("/worker")
	public ResponseEntity<?> getWorkers(@CookieValue(name="session-id",defaultValue="0") String sessId
									  , @RequestParam(name="qualificationID",defaultValue="") String qualificationID) {
		if (!Server.getInstance().isSessionValid(Integer.parseInt(sessId))) {
			System.out.println("[SERVER APPLICATION / CATEGORY] Invalid session: " + sessId);
			return ResponseEntity.badRequest().build(); 
		}

		Worker.GetResponse response = Server.getInstance().handleWorkerList(qualificationID);

		if (response.getErrorCode() == Server.getInstance().getRescodeOK()) {
			ResponseCookie refreshed = Server.getInstance().refreshSession(Integer.parseInt(sessId));
			return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE,refreshed.toString()).body(response);
		} else {
			return ResponseEntity.ok(response);
		}
	}

	@GetMapping("/device")
	public ResponseEntity<?> getDevice(@CookieValue(name="session-id",defaultValue="0") String sessId) {
		if (!Server.getInstance().isSessionValid(Integer.parseInt(sessId))) {
			System.out.println("[SERVER APPLICATION / CATEGORY] Invalid session: " + sessId);
			return ResponseEntity.badRequest().build(); 
		}

		Device.GetResponse response = Server.getInstance().handleDeviceList();

		if (response.getErrorCode() == Server.getInstance().getRescodeOK()) {
			ResponseCookie refreshed = Server.getInstance().refreshSession(Integer.parseInt(sessId));
			return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE,refreshed.toString()).body(response);
		} else {
			return ResponseEntity.ok(response);
		}
	}

	@PostMapping("/maintenance")
	public ResponseEntity<?> addMaintenance(@RequestBody Maintenance.Request request,
									        @CookieValue(name="session-id", defaultValue="0") String sessId) {
		if (!Server.getInstance().isSessionValid(Integer.parseInt(sessId))) {
			System.out.println("[SERVER APPLICATION POST /maintenance] Invalid session: " + sessId);
			return ResponseEntity.badRequest().build(); 
		}

		Maintenance.Response response = Server.getInstance().handleMaintenance(request);

		if (response.getErrorCode() == Server.getInstance().getRescodeOK()) {
			ResponseCookie refreshed = Server.getInstance().refreshSession(Integer.parseInt(sessId));
			return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE,refreshed.toString()).body(response);
		} else {
			return ResponseEntity.ok(response);
		}
	}

	@GetMapping("/maintenance")
	public ResponseEntity<?> getMaintenance(@CookieValue(name="session-id",defaultValue="0") String sessId
										 , @RequestParam(name="workerID",defaultValue="") String workerID
										 , @RequestParam(name="qualificationID",defaultValue="") String qualificationID) {
		if (!Server.getInstance().isSessionValid(Integer.parseInt(sessId))) {
			System.out.println("[SERVER APPLICATION GET /maintenance] Invalid session: " + sessId);
			return ResponseEntity.badRequest().build(); 
		}

		Maintenance.GetResponse response = Server.getInstance().handleMaintenanceList(workerID,qualificationID);

		if (response.getErrorCode() == Server.getInstance().getRescodeOK()) {
			ResponseCookie refreshed = Server.getInstance().refreshSession(Integer.parseInt(sessId));
			return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE,refreshed.toString()).body(response);
		} else {
			return ResponseEntity.ok(response);
		}
	}

	@PostMapping("/assign")
	public ResponseEntity<?> setAssignment(@RequestBody Assignment.Request request,
									        @CookieValue(name="session-id", defaultValue="0") String sessId) {
		if (!Server.getInstance().isSessionValid(Integer.parseInt(sessId))) {
			System.out.println("[SERVER APPLICATION POST /assign] Invalid session: " + sessId);
			return ResponseEntity.badRequest().build(); 
		}

		Assignment.Response response = Server.getInstance().handleAssignment(request);

		if (response.getErrorCode() == Server.getInstance().getRescodeOK()) {
			ResponseCookie refreshed = Server.getInstance().refreshSession(Integer.parseInt(sessId));
			return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE,refreshed.toString()).body(response);
		} else {
			return ResponseEntity.ok(response);
		}
	}

	@PostMapping("/state")
	public ResponseEntity<?> setState(@RequestBody State.Request request,
									        @CookieValue(name="session-id", defaultValue="0") String sessId) {
		if (!Server.getInstance().isSessionValid(Integer.parseInt(sessId))) {
			System.out.println("[SERVER APPLICATION POST /state] Invalid session: " + sessId);
			return ResponseEntity.badRequest().build(); 
		}

		State.Response response = Server.getInstance().handleState(request);

		if (response.getErrorCode() == Server.getInstance().getRescodeOK()) {
			ResponseCookie refreshed = Server.getInstance().refreshSession(Integer.parseInt(sessId));
			return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE,refreshed.toString()).body(response);
		} else {
			return ResponseEntity.ok(response);
		}
	}
}
