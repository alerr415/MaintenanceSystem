package com.mansys.server.backend;

import java.util.LinkedList;
import java.util.List;

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
        Pair<Integer,String> dataResult = DatabaseManager.getInstance().authenticateUser(req.getUsername(),req.getPassword());
        int res_code = dataResult.getKey();

        // create and decode the return value into a response type
        Authenticate.Response res = new Authenticate.Response();

        // NOT THE FINAL 
        switch (res_code) {
            case 0: // good
            {
                res.setErrorCode(RESCODE_OK);
                res.setErrorMessage("Success");
                res.setRole(dataResult.getValue());
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
        
        System.out.println("[SERVER]: Handle category request:\nCategoryName: "   + req.getCategoryName()
                                                                                + "\nQualification: " + req.getQualification()
                                                                                + "\nPeriod: " + req.getCategoryPeriod()
                                                                                + "\nNormal time: " + req.getCategoryNormalTime()
                                                                                + "\nSpecification: " + req.getSpecification()
                                                                                + "\nParent: " + req.getParent());
        // get the device data from the database
        int res_code = 0;
        res_code = DatabaseManager.getInstance().addCategory(   req.getCategoryName(), 
                                                                    req.getQualification(), 
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
        String[] data = DatabaseManager.getInstance().listCategory();
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
                String[] errList = {"NO DATA"};
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
         
        System.out.println("[SERVER]: Handle category request:\nQualificationID: " + req.getQualificationID() 
                                                         + "\nQualificationName: " + req.getQualificationName());
        // get the device data from the database
        int res_code = 0;
        // res_code = DatabaseManager.getInstance().addQualication(req.getQualificationID(), req.getQualificationName());

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
        String[] data = DatabaseManager.getInstance().listQualification();
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
                String[] errList = {"NO DATA"};
                res.setResultCode(1);
                res.setResultMessage("Error during listing qualifications: NO DATA."); // UNKNOWN ERROR or NO DATA (?)
                res.setQualificationList(errList);
                break;
            }
        }
        return res;
    }
}
