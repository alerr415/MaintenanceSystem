package com.mansys.server.backend;

public class State {
    public static class Request {
        private String maintenanceID;
        private String state;
        private String denialJustification;
        public String getMaintenanceID() {
            return maintenanceID;
        }
        public String getState() {
            return state;
        }
        public String getDenialJustification() {
            return denialJustification;
        }
        public void setMaintenanceID(String value) {
            this.maintenanceID= value;
        }
        public void setState(String value) {
            this.state = value;
        }
        public void setDenialJustification(String value) {
            this.denialJustification= value;
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
