package com.mansys.server.backend;

/**
 * Interface to server
 * @author Tálas Martin
 */

public interface ServerInterface {
    public Authenticate.Response handleAuthenticate(Authenticate.Request req);
    public Device.Response handleDevice(Device.Request req);
    public Category.Response handleCategory(Category.Request req);
    public Category.GetResponse handleCategoryList();
    public Qualification.GetResponse handleQualificationList();
    public Qualification.Response handleQualification(Qualification.Request req);
}
