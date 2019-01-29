package org.endeavourhealth.datasetmanager.api.logic;
import org.endeavourhealth.datasetmanager.api.dal.DatasetManagerDAL;
import org.endeavourhealth.datasetmanager.api.dal.DatasetManagerDAL_JDBC;
import org.endeavourhealth.scheduler.models.database.DataSetEntity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

public class DatasetManagerLogic {

    private static final Logger LOG = LoggerFactory.getLogger(DatasetManagerLogic.class);

    private DatasetManagerDAL dal;

    public DatasetManagerLogic() {
        try {
            this.dal = new DatasetManagerDAL_JDBC();
        } catch (Exception e) {
            LOG.error(e.getMessage());
        }
    }

    public List<DataSetEntity> getAllDatasets() throws Exception {
        return DataSetEntity.getAllDatasets();
    }

    public void deleteDataset(String id) throws Exception  {
        DataSetEntity.deleteDataset(Integer.valueOf(id));
    }

}
