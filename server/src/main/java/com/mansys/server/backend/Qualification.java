package com.mansys.server.backend;

/** 
 * 
 * @author Tálas Martin
 */

public class Qualification {
    
    public static class Request {

        int qualificationID;
        String qualificationName;

        public Request(){
                     
        }
    }

    public static class Response {

        private String errorMessage;
        private int errorCode;

        public Response(){

        }
    }
}
