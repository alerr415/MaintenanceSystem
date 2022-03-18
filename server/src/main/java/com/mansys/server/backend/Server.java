package com.mansys.server.backend;

import java.util.LinkedList;
import java.util.List;

import com.mansys.server.data.DatabaseManager;

import org.springframework.http.ResponseCookie;

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
     * Just for ease to standardise the success code.
     */
    private final int RESCODE_OK = 0;

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

    // generate
    public ResponseCookie generateSession() {
        return null;
    }

    // check
    public boolean isSessionValid(int sessId) {
        return false;
    }

    // refresh
    public ResponseCookie refreshSession(int sessId) {
        return null;
    }

    // delete
    public ResponseCookie deleteSession(int sessId) {
        return null;
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
        int res_code = 0;
        //res_code = DatabaseManager.getInstance().authenticateUser(req.getUsername(),req.getPassword());

        // create and decode the return value into a response type
        Authenticate.Response res = new Authenticate.Response();

        // NOT THE FINAL 
        switch (res_code) {
            case 0: // good
            {
                res.setErrorCode(RESCODE_OK);
                res.setErrorMessage("Success");
                res.setRole("@dummy_role@");
                break;
            }
            default:
            {
                res.setErrorCode(1);
                res.setErrorMessage("Unknown Login");
                res.setRole("@dummy_role@");
                break;
            }
        }
        return res;
    }

    @Override
    public Device.Response handleDevice(Device.Request req) {

        System.out.println("[SERVER]: Handle device request:\nDeviceID: "   + req.getDeviceID()
                                                                            + "\nCategoryID: " + req.getDeviceCategoryID() 
                                                                            + "\nDeviceName: " + req.getDeviceName()
                                                                            + "\nDeviceDescription: " + req.getDeviceDescription()
                                                                            + "\nDevicePosition: " + req.getDeviceLocation());
        // get the device data from the database
        int res_code = 0;
        // res_code = DatabaseManager.getInstance().addDevice( req.getDeviceID(), 
        //                                                         req.getDeviceCategoryID(), 
        //                                                         req.getDeviceName(), 
        //                                                         req.getDeviceDescription(), 
        //                                                         req.getDeviceLocation());

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
                res.setErrorMessage("Unknown Device");
                break;
            }
        }
        return res;
    }

    @Override
    public Category.Response handleCategory(Category.Request req) {
        
        System.out.println("[SERVER]: Handle category request:\nCategoryID: "   + req.getCategoryID()
                                                                                + "\nCategoryID: " + req.getQualificationID() 
                                                                                + "\nCategoryName: " + req.getCategoryName()
                                                                                + "\nPeriod: " + req.getCategoryPeriod()
                                                                                + "\nNormal time: " + req.getCategoryNormalTime()
                                                                                + "\nSpecification: " + req.getSpecification());
        // get the device data from the database
        int res_code = 0;
        // res_code = DatabaseManager.getInstance().addCategory(   req.getCategoryID(), 
        //                                                             req.getQualificationID(), 
        //                                                             req.getCategoryName(), 
        //                                                             req.getCategoryPeriod(), 
        //                                                             req.getCategoryNormalTime(),
        //                                                             req.getSpecification());


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
                res.setErrorMessage("Unknown Device Category");
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
}
