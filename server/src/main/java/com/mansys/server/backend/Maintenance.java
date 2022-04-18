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

    public static class MaintenanceData {
        public int maintenanceTaskID;
        public int deviceID;
        public String deviceName;
        public String deviceLocation;
        public String maintenanceTaskName;
        // TODO: can change this to the string representation
        public int state;
        public int workerID;
        // TODO: probably other worker data mayB
        public String startDate;
        public String finishDate;
        public String normTime;
        public String specification;
    }
}
