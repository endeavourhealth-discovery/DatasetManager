package org.endeavourhealth.datasetmanager.api.logic;

import org.endeavourhealth.datasetmanager.api.dal.DatasetManagerDAL;
import org.endeavourhealth.datasetmanager.api.dal.DatasetManagerDAL_JDBC;

public class DatasetManagerLogic {
    private DatasetManagerDAL dal;

    public DatasetManagerLogic() {
        try {
            this.dal = new DatasetManagerDAL_JDBC();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public DatasetManagerLogic(DatasetManagerDAL dal) {
        this.dal = dal;
    }

    public String getMessage(String name) {
        return dal.getGreeting() + " " + name;
    }
}
