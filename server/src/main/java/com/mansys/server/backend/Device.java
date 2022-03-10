package com.mansys.server.backend;

/** 
 * 
 * @author Tálas Martin
 */

public class Device {

    public static class Request {

        int deviceID;
        int deviceCategoryID;
        String devicePosition;
        String deviceName;
        String deviceDescription;

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
