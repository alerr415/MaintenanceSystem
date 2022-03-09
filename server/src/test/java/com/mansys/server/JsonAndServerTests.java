package com.mansys.server;

import com.mansys.server.backend.*;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import com.mansys.server.data.JsonParser;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class JsonAndServerTests {

    @Test
    void jsonParses() {
        String json = "{\"username\":\"test_uname\", \"password\":\"test_passw\"}";
        Authenticate.Request req = null;
        try {
            req = JsonParser.getInstance().toClass(json,Authenticate.Request.class);
            assertNotNull(req);
            assertEquals("test_uname", req.getUsername());
            assertEquals("test_passw", req.getPassword());
        } catch (Exception e) {
            System.err.println("[ERROR]: " + e.getMessage() + "\nStack Trace:");
            e.printStackTrace();
        }
    }
}