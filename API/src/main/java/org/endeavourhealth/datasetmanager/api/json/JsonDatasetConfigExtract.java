package org.endeavourhealth.datasetmanager.api.json;

import java.util.List;

public class JsonDatasetConfigExtract {

    private String type = null;
    private List<JsonDatasetFields> fields;
    private List<JsonDatasetCodeSet> codeSets;
    private List<JsonDatasetParameter> parameters;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public List<JsonDatasetFields> getFields() {
        return fields;
    }

    public void setFields(List<JsonDatasetFields> fields) {
        this.fields = fields;
    }

    public List<JsonDatasetParameter> getParameters() {
        return parameters;
    }

    public void setParameters(List<JsonDatasetParameter> parameters) {
        this.parameters = parameters;
    }

    public List<JsonDatasetCodeSet> getCodeSets() {
        return codeSets;
    }

    public void setCodeSets(List<JsonDatasetCodeSet> codeSets) {
        this.codeSets = codeSets;
    }

}