package com.mansys.server.backend;

/** 
 * 
 * @author Tálas Martin
 */

public class Qualification {
    
    public static class Request {

        private int qualificationID;
        private String qualificationName;

        public Request(){
                     
        }

        public int getQualificationID(){
            return this.qualificationID;
        }

        public String getQualificationName(){
            return this.qualificationName;
        }

        public void setQualificationID(int value){
            this.qualificationID = value;
        }

        public void setQualificationName(String value){
            this.qualificationName = value;
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
