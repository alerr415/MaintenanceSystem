package com.mansys.server.backend;

/** 
 * 
 * @author Tálas Martin
 */

public class Device {

    public static class Request {

        int deviceID;
        int deviceCategoryID;
        String deviceName;
        String deviceDescription;
        String deviceLocation;

        public Request(){
                     
        }


        public int getDeviceID(){
            return this.deviceID;
        }

        public int getDeviceCategoryID(){
            return this.deviceCategoryID;
        }

        public String getDeviceName(){
            return this.deviceName;
        }

        public String getDeviceDescription(){
            return this.deviceDescription;
        }

        public String getDeviceLocation(){
            return this.deviceLocation;
        }

        public void setDeviceID(int value){
            this.deviceID = value;
        }

        public void setDeviceCategoryID(int value){
            this.deviceCategoryID = value;
        }

        public void setDeviceName(String value){
            this.deviceName = value;
        }

        public void setDeviceDescription(String value){
            this.deviceDescription = value;
        }
        public void setDeviceLocation(String value){
            this.deviceLocation = value;
        }
    }

    public static class Response {

        private String errorMessage;
        private int errorCode;

        public Response(){

        }

        public String getErrorMessage(){
            return this.errorMessage;
        }

        public int getErrorCode(){
            return this.errorCode;
        }

        public void setErrorMessage(String value){
            this.errorMessage = value;
        }

        public void setErrorCode(int value){
            this.errorCode = value;
        }
    }
}
