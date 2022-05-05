package com.mansys.server.backend;

public class Assignment {
    public static class Request {
        private String maintenanceID;
        private String workerID;

        public String getMaintenanceID() {
            return this.maintenanceID;
        }
        public String getWorkerID() {
            return this.workerID;
        }
        public void setMaintenanceID(String value) {
            this.maintenanceID = value;
        }
        public void setWorkerID(String value) {
            this.workerID = value;
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
