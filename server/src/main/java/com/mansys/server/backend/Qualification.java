package com.mansys.server.backend;

/** 
 * 
 * @author Tálas Martin
 */

public class Qualification {
    public class Request {

        int qualificationID;
        String qualificationName;

        public Request(){
                     
        }
    }

    public class Response {

        private String errorMessage;
        private int errorCode;

        public Response(){

        }
    }
}
