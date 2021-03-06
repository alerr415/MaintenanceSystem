package com.mansys.server.backend;

import java.util.LinkedList;
import java.util.List;

import com.mansys.server.backend.Worker.GetResponse;
import com.mansys.server.backend.Worker.Request;
import com.mansys.server.backend.Worker.Response;
import com.mansys.server.data.DatabaseManager;

import org.springframework.http.ResponseCookie;

import javafx.util.Pair;

/**
 * The server class handles all the functionallity of the conceptual server.
 * It follows the singleton design pattern, as we want to have only one instance of the server to exists.
 * @author Tóth Bálint
 * @author Tálas Martin
 */
public class Server implements ServerInterface {

    // ------------------------------------------------------------------------------------------
    // [FIELDS] ---------------------------------------------------------------------------------
    // singleton instance
    private static Server instance = null;

    /**
     * Cookie enforcement 
     */
    private final boolean COOKIE_ENFORCEMENT = false; 

    /**
     * Just for ease to standardise the success code.
     */
    private final int RESCODE_OK = 0;

    /**
     * The lifetime of a cookie at generation.
     */
    private final int COOKIE_LIFETIME = 60 * 15; // 15 minutes

    /**
     * The name of the cookie that will represent the session.
     * IMPORTANT: in the REST controller, the "session-id" string must be specified at compile time
     */
    private final String COOKIE_ID = "session-id";

    /**
     * Update frequency modifier for the timer tasks.
     */
    public static final long UPDATE_DELAY = 1000L * 60L * 60L; // 1 hour

    /**
     * States
     * 
     */
    private final String STATE_REJECTED = "3";
    private final String STATE_STARTED = "4";
    private final String STATE_FINISHED = "5";


    /**
     * Container to store the valid sessions.
     * Basic session: <br>
     *  - during successful authentication the server generates a (big) random number, that will be the id<br>
     *  - the session id-s will be stored in a list<br>
     *  - also the session id will be sent to the client web browser as a cookie
     *  - during every request-response, the cookie is renewed and resent to the client
     *  - during logout, the cookie is deleted from the client
     */
    public List<Integer> validSessions;

    // ------------------------------------------------------------------------------------------
    // [SINGLETON & CONSTRUCTION] ---------------------------------------------------------------

    /**
     * Initializing sessions
     */
    private Server() {
        validSessions = new LinkedList<>();
    }

    /**
     * Standard instance query.
     * @return The singleton instance.
     */
    public static Server getInstance() {
        if (instance == null) {
            instance = new Server();
        }
        return instance;
    }

    /**
     * For the spring app to get the result from a standard response class.
     * @return the result code integer representing success (0 for most of the times)
     */
    public final int getRescodeOK() {
        return RESCODE_OK;
    }

    // ------------------------------------------------------------------------------------------
    // [SESSION] --------------------------------------------------------------------------------

    /**
     * Configurable cookie generation.
     * @param sessId the session id (from the generation or the list)
     * @return a freshly baked http ResponseCookie with the session id set.
     */
    private ResponseCookie generateCookie(int sessId) {
        return ResponseCookie.from(COOKIE_ID,Integer.toString(sessId))
            .maxAge(COOKIE_LIFETIME)
            .httpOnly(false)
            .secure(true)
            .build();
    }

    /**
     * Generates the initial cookie and inserts it into the valid sessions list.
     * @param username the username so the session id can be generated
     * @return the initial http ResponseCookie to the client's browser
     */
    public ResponseCookie generateSession(String username) {
        int sessId = new StringBuilder(username)
            .append(Integer.toString((int)(Math.random()*1000)))
            .toString()
            .hashCode();
        validSessions.add(sessId);
        return generateCookie(sessId);
    }

    /**
     * Checks if the given session id is in the valid sessions list. (aka. the session is valid)
     * @param sessId session id from the client's cookie
     * @return boolean representing the validness of the request
     */
    public boolean isSessionValid(int sessId) {
        if (!COOKIE_ENFORCEMENT)
            return true;
        return validSessions.contains(sessId);
    }

    /**
     * Refreshes the session cookie: takes the session id and gives back a new cookie with 15 mins.
     * @param sessId session id from the client's cookie
     * @return fresh cookie
     */
    public ResponseCookie refreshSession(int sessId) {
        return generateCookie(sessId);
    }

    /**
     * Deletes the session:
     * Deletes the session id from the list and gives a zero second lifetime cooke to the client.
     * That will make the client's browser instantly forget the cookie and the session id.
     * @param sessId
     * @return
     */
    public ResponseCookie deleteSession(int sessId) {
        validSessions.remove(validSessions.indexOf(sessId));
        return ResponseCookie.from(COOKIE_ID,Integer.toString(sessId))
            .httpOnly(true)
            .maxAge(0)
            .secure(true)
            .build();
    }

    // ------------------------------------------------------------------------------------------
    // [INTERFACE METHODS] ----------------------------------------------------------------------

    /**
     * Authenticate handling.
     * implemented from ServerInterface
     */
    @Override
    public Authenticate.Response handleAuthenticate(Authenticate.Request req){

		System.out.println("[SERVER]: Handle login request username: " + req.getUsername() + " password: " + req.getPassword());
        // get the authentication data from the database
        Authenticate.Response res = DatabaseManager.getInstance().authenticateUser(req.getUsername(),req.getPassword());

        // create and decode the return value into a response type
        int res_code = res.getErrorCode();
        // NOT THE FINAL 
        switch (res_code) { // this is useless at this point but #legacyForever
            case 0: // good
            {
                res.setErrorCode(RESCODE_OK);
                res.setErrorMessage("Success");
                break;
            }
            default:
            {
                res.setErrorCode(1);
                res.setErrorMessage("Login failed: invalid username or password.");
                res.setRole(null);
                break;
            }
        }
        return res;
    }

    @Override
    public Device.Response handleDevice(Device.Request req) {

        System.out.println("[SERVER]: Handle device request:\nDeviceName: "   + req.getDeviceName()
                                                                            + "\nCategoryName: " + req.getDeviceCategoryName()
                                                                            + "\nDeviceDescription: " + req.getDeviceDescription()
                                                                            + "\nDevicePosition: " + req.getDeviceLocation());
        // get the device data from the database
        int res_code = 0;
        res_code = DatabaseManager.getInstance().addDevice( req.getDeviceName(),
                                                                req.getDeviceCategoryName(),
                                                                req.getDeviceDescription(),
                                                                req.getDeviceLocation());

        // create and decode the return value into a response type
        Device.Response res = new Device.Response();

         // NOT THE FINAL
         switch (res_code) {
            case 0: // good
            {
                res.setErrorCode(RESCODE_OK);
                res.setErrorMessage("Success");
                break;
            }
            default:
            {
                res.setErrorCode(1);
                res.setErrorMessage("Device creation failed. Wrong parameters.");
                break;
            }
        }
        return res;
    }

    @Override
    public Category.Response handleCategory(Category.Request req) {
        
        if(req.getParent().equals(""))
        {
            req.setParent(null);
        }

        System.out.println("[SERVER]: Handle category request:\nCategoryName: "   + req.getCategoryName()
                                                                                + "\nQualification: " + req.getQualificationID()
                                                                                + "\nPeriod: " + req.getCategoryPeriod()
                                                                                + "\nNormal time: " + req.getCategoryNormalTime()
                                                                                + "\nSpecification: " + req.getSpecification()
                                                                                + "\nParent: " + req.getParent());
        // get the device data from the database
        int res_code = 0;

        res_code = DatabaseManager.getInstance().addCategory(   req.getCategoryName(), 
                                                                    req.getQualificationID(), 
                                                                    req.getCategoryPeriod(),
                                                                    req.getCategoryNormalTime(),
                                                                    req.getSpecification(),
                                                                    req.getParent());


        Category.Response res = new Category.Response();

        // NOT THE FINAL
        switch (res_code) {
            case 0: // good
            {
                res.setErrorCode(RESCODE_OK);
                res.setErrorMessage("Success");
                break;
            }
            default:
            {
                res.setErrorCode(1);
                res.setErrorMessage("Error during device addition: wrong parameter.");
                break;
            }
        }
        return res;
    }


    @Override
    public Category.GetResponse handleCategoryList() {
        System.out.println("[SERVER]: Handle category list request: NO PARAMETER\n[LISTING CATEGORIES...]");
        // get the device data from the database
        int res_code = 0;
        Category.CategoryData[] data = DatabaseManager.getInstance().listCategoryData();
        res_code = ((data.length == 0) ? 1 : 0);

        Category.GetResponse res = new Category.GetResponse();

        // NOT THE FINAL
        switch (res_code) {
            case 0: // good
            {
                res.setResultCode(RESCODE_OK);
                res.setResultMessage("Success");
                res.setCategoryList(data);
                break;
            }
            default:
            {
                Category.CategoryData[] errList = new Category.CategoryData[0];
                res.setResultCode(1);
                res.setResultMessage("Error during listing device category: NO DATA."); // UNKNOWN ERROR or NO DATA (?)
                res.setCategoryList(errList);
                break;
            }
        }
        return res;
    }

    @Override
    public Qualification.Response handleQualification(Qualification.Request req) {

        System.out.println("[SERVER]: Handle category request: QualificationName: " + req.getQualificationName());

        // get the device data from the database
        int res_code = 0;
        res_code = DatabaseManager.getInstance().addQualication(req.getQualificationName());

        Qualification.Response res = new Qualification.Response();

        // NOT THE FINAL
        switch (res_code) {
            case 0: // good
            {
                res.setErrorCode(RESCODE_OK);
                res.setErrorMessage("Success");
                break;
            }
            default:
            {
                res.setErrorCode(1);
                res.setErrorMessage("Unknown Qualification");
                break;
            }
        }
        return res;
    }

    @Override
    public com.mansys.server.backend.Qualification.GetResponse handleQualificationList() {
        System.out.println("[SERVER]: Handle qualification list request: NO PARAMETER\n[LISTING QUALIFICATIONS...]");
         
        // get the device data from the database
        int res_code = 0;
        Qualification.QualificationData[] data = DatabaseManager.getInstance().listQualification();
        res_code = ((data.length == 0) ? 1 : 0);

        Qualification.GetResponse res = new Qualification.GetResponse();

        // NOT THE FINAL 
        switch (res_code) {
            case 0: // good
            {
                res.setResultCode(RESCODE_OK);
                res.setResultMessage("Success");
                res.setQualificationList(data);
                break;
            }
            default:
            {
                Qualification.QualificationData[] errList = new Qualification.QualificationData[0];
                res.setResultCode(1);
                res.setResultMessage("Error during listing qualifications: NO DATA."); // UNKNOWN ERROR or NO DATA (?)
                res.setQualificationList(errList);
                break;
            }
        }
        return res;
    }

    @Override
    public Response handleWorker(Request req) {
        System.out.println("[SERVER]: Handle add worker request:\nFirstName: " + req.getFirstName()
                                                             + "\nLastName: " + req.getLastName()
                                                             + "\nQualification id: " + req.getQualificationID());
        
        int res_code = 0;
        Worker.Response res = new Worker.Response();
        res_code = DatabaseManager.getInstance().addWorker(
              req.getLastName()
            , req.getFirstName()
            , req.getQualificationID()
            , req.getUsername()
            , req.getPassword());
        switch (res_code) {
            case 0: // good
            {
                res.setErrorCode(RESCODE_OK);
                res.setErrorMessage("Success");
                break;
            }
            default:
            {
                res.setErrorCode(1);
                res.setErrorMessage("Worker creation failed: Wrong parameter.");
            }
        }
        return res;
    }

    @Override
    public GetResponse handleWorkerList(String qualificationID) {
        System.out.println("[SERVER]: Handle worker list request\nqualification id: " + qualificationID + "\n[LISTING WORKERS...]");
        int res_code = 0;
        Worker.WorkerData[] data = {};
        data = DatabaseManager.getInstance().listWorker(qualificationID);
        res_code = data.length == 0 ? 1 : 0;

        Worker.GetResponse res = new Worker.GetResponse();
        switch (res_code)
        {
            case 0: // good
            {
                res.setErrorMessage("Success");
                res.setErrorCode(RESCODE_OK);
                res.setData(data);
                break;
            }
            case 1:
            {
                res.setErrorCode(69);
                res.setErrorMessage("No workers with qualification " + qualificationID);
                break;
            }
            default:
            {
                res.setErrorMessage("Server error");
                res.setErrorCode(1);
                break;
            }
        }

        return res;
    }

    @Override
    public Device.GetResponse handleDeviceList() {
        System.out.println("[SERVER]: Handle device list request: NO PARAMETER\n[LISTING DEVICES...]");
        int res_code = 0;
        Device.DeviceData[] data = {};
        data = DatabaseManager.getInstance().listDevice();
        res_code = data.length == 0 ? 1 : 0;

        Device.GetResponse res = new Device.GetResponse();
        switch (res_code)
        {
            case 0: // good
            {
                res.setErrorMessage("Success");
                res.setErrorCode(RESCODE_OK);
                res.setData(data);
                break;
            }
            default:
            {
                res.setErrorMessage("Server error");
                res.setErrorCode(1);
                break;
            }
        }
        return res;
    }

    @Override
    public com.mansys.server.backend.Maintenance.Response handleMaintenance(
            com.mansys.server.backend.Maintenance.Request req) {
        System.out.println("[SERVER]: handle add maintenance request:"
                         + "\ndeviceID: " + req.getDeviceID()
                         + "\ntaskName: " + req.getTaskName()
                         + "\nspecification: " + req.getSpecification()
                         + "\nnormTime: " + req.getNormTime());
        int res_code = DatabaseManager.getInstance().addMaintenance(
            req.getDeviceID(), req.getTaskName(), req.getSpecification(), req.getNormTime());
        Maintenance.Response res = new Maintenance.Response();
        switch (res_code) {
            case 0: // good
            {
                res.setErrorMessage("Success");
                res.setErrorCode(RESCODE_OK);
                break;
            }
            default:
            {
                res.setErrorMessage("Server error");
                res.setErrorCode(1);
                break;
            }
        }
        return res;
    }

    @Override
    public com.mansys.server.backend.Maintenance.GetResponse handleMaintenanceList(String workerID, String qualificationID) {
        System.out.println("[SERVER]: Handle maintenance list request:\nid: "+workerID+"\n[LISTING MAINTENANCE TASKS...]");
        int res_code = 0;
        Maintenance.MaintenanceData[] data = {};
        data = DatabaseManager.getInstance().listMaintenance(workerID,qualificationID);
        res_code = data.length == 0 ? 1 : 0;

        Maintenance.GetResponse res = new Maintenance.GetResponse();
        switch (res_code)
        {
            case 0: // good
            {
                res.setErrorMessage("Success");
                res.setErrorCode(RESCODE_OK);
                res.setData(data);
                break;
            }
            case 1:
            {
                res.setErrorCode(69);
                res.setErrorMessage("Internal error");
                if (!workerID.equals(""))
                    res.setErrorMessage("No tasks for worker " + workerID);
                if (!qualificationID.equals(""))
                    res.setErrorMessage("No avaliable tasks for qualification " + qualificationID);
                break;
            }
            default:
            {
                res.setErrorMessage("Server error");
                res.setErrorCode(1);
                break;
            }
        }
        return res;
    }

    @Override
    public void updateTimerTasks() {
        // sync
        BusinessLogic.getInstance().syncTimerTasksToCategories();

        // update
        BusinessLogic.getInstance().scanTimerTasks();
    }
    @Override
    public Assignment.Response handleAssignment(Assignment.Request req) {
        System.out.println("[SERVER] handle assignment request\ntask: " + req.getMaintenanceID() + "\nworker: " + req.getWorkerID());
        int resCode = DatabaseManager.getInstance().setAssignment(req.getMaintenanceID(),req.getWorkerID());
        Assignment.Response res = new Assignment.Response();
        switch (resCode) {
            case 0:
            {
                res.setErrorCode(0);
                res.setErrorMessage("Success");
                break;
            }
            default:
            {
                res.setErrorCode(1);
                res.setErrorMessage("ServerError");
                break;
            }
        }
        return res;
    }

    @Override
    public State.Response handleState(State.Request req) {
        System.out.println("[SERVER] handle state change\ntask: " + req.getMaintenanceID() + "\nstate: " + req.getState());
        int resCode = DatabaseManager.getInstance().modifyState(req.getMaintenanceID(),req.getState(),req.getDenialJustification());

        // handle reset
        if (req.getState().equals(STATE_REJECTED)) {
            DatabaseManager.getInstance().resetTask(req.getMaintenanceID());
        }

        if (req.getState().equals(STATE_STARTED)) {
            DatabaseManager.getInstance().startTask(req.getMaintenanceID());
        }

        if (req.getState().equals(STATE_FINISHED)) {
            DatabaseManager.getInstance().finishTask(req.getMaintenanceID());
        }


        State.Response res = new State.Response();
        switch (resCode) {
            case 0:
            {
                res.setErrorCode(0);
                res.setErrorMessage("Success");
                break;
            }
            default:
            {
                res.setErrorCode(1);
                res.setErrorMessage("ServerError");
                break;
            }
        }
        return res;
    }
}
