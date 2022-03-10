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
        //throw new UnsupportedOperationException("This function is not implemented yet!");//dummy return
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
}
