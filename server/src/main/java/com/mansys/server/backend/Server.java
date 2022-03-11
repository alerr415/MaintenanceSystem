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
        int res_code = 0;
        //res_code = DatabaseManager.getInstance().authenticateUser(req.getUsername(),req.getPassword());

        // create and decode the return value into a response type
        Authenticate.Response res = new Authenticate.Response();

        // NOT THE FINAL 
        switch (res_code) {
            case 0: // good
            {
                res.setErrorCode(0);
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
                res.setErrorCode(0);
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
                res.setErrorCode(0);
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
                res.setErrorCode(0);
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
