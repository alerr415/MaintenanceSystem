package com.mansys.server.data;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.mansys.server.backend.Server;

import org.junit.jupiter.api.Test;
import org.springframework.http.ResponseCookie;


public class ServerSessionTest {
    @Test
    public void generateSessionTest() {
        String username = "noobmester_69";
        ResponseCookie cookie  = Server.getInstance().generateSession(username);
        assertEquals("session-id", cookie.getName());
        assertNotNull(cookie.getValue());
        int sessId = Integer.parseInt(cookie.getValue());
        boolean valid = Server.getInstance().isSessionValid(sessId);
        assertTrue(valid);

        ResponseCookie refresh = Server.getInstance().refreshSession(sessId);
        assertEquals(sessId, Integer.parseInt(refresh.getValue()));

        Server.getInstance().deleteSession(sessId);
        boolean afterDelete = Server.getInstance().isSessionValid(sessId);
        assertFalse(afterDelete);
    }
}
