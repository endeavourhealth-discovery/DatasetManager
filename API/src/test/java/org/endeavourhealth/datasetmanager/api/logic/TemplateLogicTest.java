package org.endeavourhealth.datasetmanager.api.logic;

import org.endeavourhealth.datasetmanager.api.dal.DatasetManagerDAL_Mock;
import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.*;

public class TemplateLogicTest {
    private DatasetManagerDAL_Mock dal;
    private DatasetManagerLogic instance;

    @Before
    public void setup() {
        dal = new DatasetManagerDAL_Mock();
        instance =  new DatasetManagerLogic(dal);
    }

    @Test
    public void getMessage() {
        String actual = instance.getMessage("Fred");
        assertTrue("DAL not called", dal.getGreetingCalled);
        assertEquals("Malformed message ", "Hello mock Fred", actual);
    }
}
