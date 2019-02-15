package org.endeavourhealth.datasetmanager.api.json;

import java.util.List;

public class JsonDatasetConfig {

    private String name = null;
    private Integer id = null;
    private List<JsonDatasetConfigExtract> extract;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public List<JsonDatasetConfigExtract> getExtract() {
        return extract;
    }

    public void setExtract(List<JsonDatasetConfigExtract> extract) {
        this.extract = extract;
    }
}