package com.mansys.server.backend;

/** 
 * 
 * @author Tálas Martin
 */


public class Qualification {
    
    public static class Request {

        private String qualificationName;

        public Request(){
                     
        }

        public String getQualificationName(){
            return this.qualificationName;
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
