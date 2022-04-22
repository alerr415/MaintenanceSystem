package com.mansys.server.logic;

public class Category {

    // CURSED
    public static class Period {
        public static final String DAILY = "napi";
        public static final String WEEKLY = "heti";
        public static final String QUARTER_YEARLY = "negyedeves";
        public static final String HALF_YEARLY = "feleves";
        public static final String YEARLY = "eves";
    }

    public String categoryName; // ID
    public String period;       // extremely delicate variable
    public int qualification;   // this is also a foreign key
    public String stepsDescription; // a.k.a. ur Stepsis
    public String parent;
}