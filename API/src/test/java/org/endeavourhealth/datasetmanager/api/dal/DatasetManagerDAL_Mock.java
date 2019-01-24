package org.endeavourhealth.datasetmanager.api.dal;

public class DatasetManagerDAL_Mock implements DatasetManagerDAL {
    public boolean getGreetingCalled = false;
    @Override
    public String getGreeting() {
        this.getGreetingCalled = true;
        return "Hello mock";
    }
}
