package org.endeavourhealth.datasetmanager.api.json;

public class JsonDatasetCodeSet {

    private int codeSetId;
    private String extractType = null;

    public int getCodeSetId() {
        return codeSetId;
    }

    public void setCodeSetId(int codeSetId) {
        this.codeSetId = codeSetId;
    }

    public String getExtractType() {
        return extractType;
    }

    public void setExtractType(String extractType) {
        this.extractType = extractType;
    }

}