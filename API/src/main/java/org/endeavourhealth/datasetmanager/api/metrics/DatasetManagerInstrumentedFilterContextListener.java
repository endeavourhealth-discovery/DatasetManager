package org.endeavourhealth.datasetmanager.api.metrics;

import com.codahale.metrics.MetricRegistry;
import com.codahale.metrics.SharedMetricRegistries;
import com.codahale.metrics.servlet.InstrumentedFilterContextListener;

public class DatasetManagerInstrumentedFilterContextListener extends InstrumentedFilterContextListener {

    public static final MetricRegistry REGISTRY = SharedMetricRegistries.getOrCreate("datasetManagerMetricRegistry");

    @Override
    protected MetricRegistry getMetricRegistry() {
        return REGISTRY;
    }
}
