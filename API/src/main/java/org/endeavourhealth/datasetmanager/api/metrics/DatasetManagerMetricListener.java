package org.endeavourhealth.datasetmanager.api.metrics;

import com.codahale.metrics.MetricRegistry;
import com.codahale.metrics.servlets.MetricsServlet;

public class DatasetManagerMetricListener extends MetricsServlet.ContextListener {
    public static final MetricRegistry datasetManagerMetricRegistry = DatasetManagerInstrumentedFilterContextListener.REGISTRY;

    @Override
    protected MetricRegistry getMetricRegistry() {
        return datasetManagerMetricRegistry;
    }
}
