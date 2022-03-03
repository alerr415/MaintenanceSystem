package com.mansys.server;

/**
 * Standard POJO that represents a request from the client.
 * @author Tóth Bálint
 */
public class AuthenticateRequest {
    private String username;
    private String password;

    public AuthenticateRequest(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
