package com.mansys.server;

/**
 * The server class handles all the functionallity of the conceptual server.
 * It follows the singleton design pattern, as we want to have only one instance of the server to exists.
 * @author Tóth Bálint
 */
public class Server {

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
     * Authentication backend.
     * can possibly return a response
     */
    public void authenticateClientLogin(AuthenticateRequest req) {
        // access the database here
    }
}
