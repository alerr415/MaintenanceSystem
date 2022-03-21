package com.mansys.server.backend;

/** 
 * 
 * @author Tálas Martin
 */

public class Category {

    public static class Request {

        String categoryName;
        String  qualification;
        String categoryPeriod;
        String categoryNormalTime; //cast to datetime
        String specification;
        String parent;

        public Request(){
                     
        }


        public String getCategoryName(){
            return this.categoryName;
        }

        public String getQualification() {
            return this.qualification;
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

        public String getParent() {
            return parent;
        }

        public void setCategoryName(String value){
            this.categoryName = value;
        }

        public void setQualification(String value){
            this.qualification = value;
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

        public void setParent(String value) {
            this.parent = value;
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