package com.mansys.server.backend;

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
    public Authenticate.Response handleAuthenticate(Authenticate.Request req){
        throw new UnsupportedOperationException("This function is not implemented yet!");//dummy return
    }
}
