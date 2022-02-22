package com.mansys.demo;

import org.json.JSONArray;
import org.json.JSONObject;
import org.json.parser.JSONParser;
import org.json.parser.ParseException;


/*
    =INSTRUCTIONS=
    initialize with:
    > mvn clean install
    compile and run with:
    > mvn compile exec:java
*/

public class App {
    public static void main( String[] args ) {
        System.out.println( "Hello World!" ); 

        String jsonString = "[{\"name\":\"Swati\",\"rollNo\":" +
		"\"MCA/07/01\",\"id\":10},{\"name\":\"Prabhjot\",\"" +
		"rollNo\":\"MCA/07/39\",\"id\":50}]";
 
        // Create JSON parser object.
        JSONParser parser = new JSONParser();
        try {
            // Parse JSON string using JSON parser.
            Object object = parser.parse(jsonString);
            JSONArray array = (JSONArray) object;
            System.out.println("First object:");
            System.out.println(array.get(0));
    
            // Get JSON object from JSON array.
            JSONObject jsonObject = (JSONObject) array.get(1);
            System.out.println("Second object:");
            System.out.println("Name:" + jsonObject.get("name"));
        } catch (ParseException e) {
            e.printStackTrace();
        }
    }
}
