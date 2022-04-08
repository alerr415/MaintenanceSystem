package com.mansys.server.backend;

public class Worker {
    public static class Request {
        private String lastName;
        private String firstName;
        private String qualification;

        public String getLastName() {
            return lastName;
        }

        public String getFirstName() {
            return firstName;
        }

        public String getQualification() {
            return qualification;
        }

        public void setLastName(String value) {
            this.lastName=value;
        }       
        public void setFirstName(String value) {
            this.firstName=value;
        }
        public void setQualification(String value) {
            this.qualification=value;
        }

    }

    public static class Response {
        private int errorCode;
        private String errorMessage;

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

    public static class WorkerData {
        private String lastName;
        private String firstName;
        private String qualification;

        public String getLastName() {
            return lastName;
        }

        public String getFirstName() {
            return firstName;
        }

        public String getQualification() {
            return qualification;
        }

        public void setLastName(String value) {
            this.lastName=value;
        }       
        public void setFirstName(String value) {
            this.firstName=value;
        }
        public void setQualification(String value) {
            this.qualification=value;
        }

    }

    public static class GetResponse {
        private int errorCode;
        private String errorMessage;
        private WorkerData[] data;

        public String getErrorMessage(){
            return this.errorMessage;
        }

        public int getErrorCode(){
            return this.errorCode;
        }

        public WorkerData[] getData() {
            return this.data;
        }

        public void setErrorMessage(String value){
            this.errorMessage = value;
        }

        public void setErrorCode(int value){
            this.errorCode = value;
        } 

        public void setData(WorkerData[] value) {
            this.data = value;
        }
    }
}
