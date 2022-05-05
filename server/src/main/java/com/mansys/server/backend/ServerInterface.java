package com.mansys.server.backend;

/**
 * Interface to server
 * @author Tálas Martin
 */

public interface ServerInterface {
    public Authenticate.Response handleAuthenticate(Authenticate.Request req);
    public Device.Response handleDevice(Device.Request req);
    public Device.GetResponse handleDeviceList();
    public Category.Response handleCategory(Category.Request req);
    public Category.GetResponse handleCategoryList();
    public Qualification.GetResponse handleQualificationList();
    public Qualification.Response handleQualification(Qualification.Request req);
    public Worker.Response handleWorker(Worker.Request req);
    public Worker.GetResponse handleWorkerList(String qualificationID);
    public Maintenance.Response handleMaintenance(Maintenance.Request req);
    public Maintenance.GetResponse handleMaintenanceList(String workerID);
    public void updateTimerTasks();
}
