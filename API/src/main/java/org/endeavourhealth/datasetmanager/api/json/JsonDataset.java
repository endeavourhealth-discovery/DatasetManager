package org.endeavourhealth.datasetmanager.api.json;

public class JsonDataset {

    private Integer datasetId = null;
    private JsonDatasetConfig definition = null;

    public Integer getDatasetId() {
        return datasetId;
    }

    public void setDatasetId(Integer datasetId) {
        this.datasetId = datasetId;
    }

    public JsonDatasetConfig getDefinition() {
        return definition;
    }

    public void setDefinition(JsonDatasetConfig definition) {
        this.definition = definition;
    }
}
