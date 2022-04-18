package com.mansys.server.backend;

public class Maintenance {

    public static class Request{
        private int deviceID;
        private String taskName;
        private String specification;
        private String normTime;
    
        public int getDeviceID() {
            return deviceID;
        }
        public String getTaskName() {
            return taskName;
        }
        public String getSpecification() {
            return specification;
        }
        public String getNormTime() {
            return normTime;
        }

        public void setDeviceID(int value) {
            this.deviceID = value;
        }
        public void setTaskName(String value) {
            this.taskName = value;
        }
        public void setSpecification(String value) {
            this.specification = value;
        }
        public void setNormTime(String value) {
            this.normTime = value;
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
