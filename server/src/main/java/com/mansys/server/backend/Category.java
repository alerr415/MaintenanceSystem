package com.mansys.server.backend;

/** 
 * 
 * @author Tálas Martin
 */

public class Category {

    public static class Request {

        int categoryID;
        int qualificationID;
        String categoryName;
        String categoryPeriod;
        String categoryNormalTime; //cast to datetime
        String specification;

        public Request(){
                     
        }

        public int getCategoryID(){
            return this.categoryID;
        }

        public int getQualificationID(){
            return this.qualificationID;
        }

        public String getCategoryName(){
            return this.categoryName;
        }

        public String getCategoryPeriod(){
            return this.categoryPeriod;
        }

        public String getCategoryNormalTime(){
            return this.categoryNormalTime;
        }

        public String getSpecification(){
            return this.specification;
        }

        public void setCategoryID(int value){
            this.categoryID = value;
        }

        public void setQualificationID(int value){
            this.qualificationID = value;
        }

        public void setCategoryName(String value){
            this.categoryName = value;
        }

        public void setCategoryPeriod(String value){
            this.categoryPeriod = value;
        }

        public void setCategoryNormalTime(String value){
            this.categoryNormalTime = value;
        }

        public void setSpecification(String value){
            this.specification = value;
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
