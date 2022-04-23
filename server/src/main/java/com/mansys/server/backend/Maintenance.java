package com.mansys.server.backend;

public class Maintenance {

    public static class Request{
        private String deviceID;
        private String taskName;
        private String specification;
        private String normTime;
    
        public int getDeviceID() {
            return Integer.parseInt(deviceID);
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
            this.deviceID = Integer.toString(value);
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

    public static class GetResponse {
        private String errorMessage;
        private int errorCode;

        private MaintenanceData[] data;

        public String getErrorMessage(){
            return this.errorMessage;
        }

        public int getErrorCode(){
            return this.errorCode;
        }

        public MaintenanceData[] getData() {
            return this.data;
        }

        public void setErrorMessage(String value){
            this.errorMessage = value;
        }

        public void setErrorCode(int value){
            this.errorCode = value;
        }   
        
        public void setData(MaintenanceData[] value) {
            this.data = value;
        }
    }

    public static class MaintenanceData {
        public String maintenanceTaskID;
        public String deviceID;
        public String deviceName;
        public String deviceLocation;
        public String maintenanceTaskName;
        // TODO: can change this to the string representation
        public String state;
        public String workerID;
        // TODO: probably other worker data mayB
        public String startDate;
        public String finishDate;
        public String normTime;
        public String specification;
    }
}
