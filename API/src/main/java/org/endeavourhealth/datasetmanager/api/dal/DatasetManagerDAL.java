package org.endeavourhealth.datasetmanager.api.dal;

import java.util.List;
import org.endeavourhealth.scheduler.models.database.DataSetEntity;

public interface DatasetManagerDAL {
    String getGreeting();

    List<DataSetEntity> getAllDatasets();
}
