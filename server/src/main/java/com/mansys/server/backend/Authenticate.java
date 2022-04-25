package com.mansys.server.backend;

/**
 * @author Tóth Bálint
 * @author Tálas Martin
 */

public class Authenticate {


    /**
     * Standard POJO that represents a request from the client.
     */
    public static class Request {
        private String username;
        private String password;

        public Request(String username, String password) {
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

    /**
     * This is a Response POJO, and it will be used for standard replies to the client
     */
    public static class Response {
        
        private String role;
        private String errorMessage;
        private int errorCode;
        //private Cookie cookie;
        private String workerId;

        public Response(){

        }

        

        //GETTERS
        public String getRole(){
            return this.role;
        }

        public String getErrorMessage(){
            return this.errorMessage;
        }

        public int getErrorCode(){
            return this.errorCode;
        }

        public String getWorkerId() {
            return this.workerId;
        }

        // public Cookie getCookie(){
        //     return this.cookie;
        // }

        //SETTERS
        public void setRole(String value){
            this.role = value;
        }

        public void setErrorMessage(String value){
            this.errorMessage = value;
        }

        public void setErrorCode(int value){
            this.errorCode = value;
        }

        public void setWorkerId(String value) {
            this.workerId = value;
        }

        // public void setCookie(Cookie value){
        //     this.cookie = value;
        // }
    }
}
