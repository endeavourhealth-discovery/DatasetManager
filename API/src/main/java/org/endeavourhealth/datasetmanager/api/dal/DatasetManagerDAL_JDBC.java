package org.endeavourhealth.datasetmanager.api.dal;

import java.util.List;

import org.endeavourhealth.common.config.ConfigManager;
import org.endeavourhealth.common.config.ConfigManagerException;
import org.endeavourhealth.scheduler.models.database.DataSetEntity;
import org.endeavourhealth.scheduler.models.database.ExtractEntity;

public class DatasetManagerDAL_JDBC implements DatasetManagerDAL {

    public DatasetManagerDAL_JDBC() throws ConfigManagerException {
        ConfigManager.Initialize("data-generator");
    }

    @Override
    public String getGreeting() {
        return "Hello";
    }

    @Override
    public List<DataSetEntity> getAllDatasets() {
        try {
            List<DataSetEntity> allDatasets = null;
            List<ExtractEntity> allExtracts = ExtractEntity.getAllExtracts();
            return allDatasets;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
