package com.mansys.server.backend;

import com.mansys.server.data.DatabaseManager;

/**
 * The server class handles all the functionallity of the conceptual server.
 * It follows the singleton design pattern, as we want to have only one instance of the server to exists.
 * @author Tóth Bálint
 * @author Tálas Martin
 */
public class Server implements ServerInterface {

    // singleton instance
    private static Server instance = null;
    
    /**
     * Unimplemented for the singleton.
     */
    private Server() {}

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
     * Authenticate handling.
     * implemented from ServerInterface
     */
    @Override
    public Authenticate.Response handleAuthenticate(Authenticate.Request req){
        
		System.out.println("[SERVER]: Handle login request username: " + req.getUsername() + " password: " + req.getPassword());
        // get the authentication data from the database
        int res_code = DatabaseManager.getInstance().authenticateUser(req.getUsername(),req.getPassword());

        // create and decode the return value into a response type
        Authenticate.Response res = new Authenticate.Response();

        // NOT THE FINAL 
        switch (res_code) {
            case 0: // good
            {
                res.setErrorCode(0);
                res.setErrorMessage("Success");
                res.setRole("@dummy_role@");
            }
            default:
            {
                res.setErrorCode(1);
                res.setErrorMessage("Unknown Login");
                res.setRole("@dummy_role@");
            }
        }
        return res;
    }

    @Override
    public Device.Response handleDevice(Device.Request req) {

        System.out.println("[SERVER]: Handle device request:\nDeviceID: "  + req.getDeviceID()
                                                                            + "\nCategoryID: " + req.getDeviceCategoryID() 
                                                                            + "\nDeviceName: " + req.getDeviceName()
                                                                            + "\nDeviceDescription: " + req.getDeviceDescription()
                                                                            + "\nDevicePosition: " + req.getDevicePosition());
        // get the device data from the database
        //int res_code = DatabaseManager.getInstance().addDevice(1, 1, "Kávéfőző","létfenntartó","I409");
        // create and decode the return value into a response type
        Device.Response res = new Device.Response();
        
         // NOT THE FINAL 
         /*switch (res_code) {
            case 0: // good
            {
                res.setErrorCode(0);
                res.setErrorMessage("Success");
            }
            default:
            {
                res.setErrorCode(1);
                res.setErrorMessage("Unknown Device");
            }
        }*/
        return res;
    }

    @Override
    public Category.Response handleCategory(Category.Request req) {
        
        Category.Response res = new Category.Response();

        // NOT THE FINAL 
         /*switch (res_code) {
            case 0: // good
            {
                res.setErrorCode(0);
                res.setErrorMessage("Success");
            }
            default:
            {
                res.setErrorCode(1);
                res.setErrorMessage("Unknown Device Category");
            }
        }*/
        return res;
    }

    @Override
    public Qualification.Response handleQualification(Qualification.Request req) {
         
        Qualification.Response res = new Qualification.Response();

        // NOT THE FINAL 
         /*switch (res_code) {
            case 0: // good
            {
                res.setErrorCode(0);
                res.setErrorMessage("Success");
            }
            default:
            {
                res.setErrorCode(1);
                res.setErrorMessage("Unknown Qualification");
            }
        }*/
        return res;
    }
}
