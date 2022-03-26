package com.mansys.server.backend;

/** 
 * 
 * @author Tálas Martin
 */


public class Qualification {
    
    @Deprecated
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
    
    @Deprecated
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

        private int resultCode;
        private String resultMessage;
        private String[] qualificationList;

        public GetResponse(){

        }

        public String[] getQualificationList(){
            return this.qualificationList;
        }

        public String getResultMessage(){
            return this.resultMessage;
        }

        public int getResultCode(){
            return this.resultCode;
        }

        public void setQualificationList(String[] value){
            this.qualificationList = value;
        }

        public void setResultMessage(String value){
            this.resultMessage = value;
        }

        public void setResultCode(int value){
            this.resultCode = value;
        }
    }

}
