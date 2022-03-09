package com.mansys.server.backend;

/**
 * Interface to server
 * @author Tálas Martin
 */

public interface ServerInterface {
    public Authenticate.Response handleAuthenticate(Authenticate.Request req);
    

}
