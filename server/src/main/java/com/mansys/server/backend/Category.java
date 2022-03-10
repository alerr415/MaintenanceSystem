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
    }

    public static class Response {

        private String errorMessage;
        private int errorCode;

        public Response(){

        }
    } 
}
