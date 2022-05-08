package com.mansys.server.backend;

public class Worker {
    public static class Request {
        private String lastName;
        private String firstName;
        private String qualificationID;
        private String username;
        private String password;

        public String getLastName() {
            return lastName;
        }
        public String getFirstName() {
            return firstName;
        }
        public int getQualificationID() {
            return Integer.parseInt(qualificationID);
        }
        public String getUsername() {
            return username;
        }
        public String getPassword() {
            return password;
        }

        public void setLastName(String value) {
            this.lastName = value;
        }       
        public void setFirstName(String value) {
            this.firstName = value;
        }
        public void setQualificationID(int value) {
            this.qualificationID = Integer.toString(value);
        }
        public void setUsername(String value) {
            this.username = value;
        }
        public void setPassword(String value) {
            this.password = value;
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
        private String workerID;
        private String lastName;
        private String firstName;
        private String qualificationID; //int

        public String getWorkerID() {
            return workerID;
        }

        public String getLastName() {
            return lastName;
        }

        public String getFirstName() {
            return firstName;
        }

        public int getQualificationID() {
            return Integer.parseInt(qualificationID);
        }

        public void setWorkerID(String value) {
            this.workerID = value;
        }

        public void setLastName(String value) {
            this.lastName = value;
        }       
        public void setFirstName(String value) {
            this.firstName = value;
        }
        public void setQualificationID(int value) {
            this.qualificationID = Integer.toString(value);
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
