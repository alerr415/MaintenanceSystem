package com.mansys.server.backend;

/** 
 * 
 * @author Tálas Martin
 */

public class Device {

    public class Request {

        int deviceID;
        int deviceCategoryID;
        String devicePosition;
        String deviceName;
        String deviceDescription;

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
