package org.endeavourhealth.datasetmanager.api.framework;

import com.codahale.metrics.jvm.*;
import io.swagger.jaxrs.config.SwaggerContextService;
import io.swagger.models.Info;
import io.swagger.models.Swagger;
import io.swagger.models.auth.OAuth2Definition;
import org.endeavourhealth.coreui.framework.config.ConfigService;
import org.endeavourhealth.datasetmanager.api.metrics.DatasetManagerInstrumentedFilterContextListener;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import java.lang.management.ManagementFactory;

public class SwaggerBootstrap extends HttpServlet {

    private static final Logger LOG = LoggerFactory.getLogger(SwaggerBootstrap.class);

    @Override
    public void init(ServletConfig config) throws ServletException {
        Info info = new Info()
                .title("Dataset Manager API")
                .description("Documentation for the Dataset Manager API ");

        LOG.info("API is running :O)");

        String baseAuthUrl = ConfigService.instance().getAuthConfig().getAuthServerUrl() +
                "/realms/" + ConfigService.instance().getAuthConfig().getRealm() + "/protocol/openid-connect";

        Swagger swagger = new Swagger().info(info);
        swagger.basePath("/api");
        swagger.securityDefinition("oauth",
                new OAuth2Definition()
                        .accessCode(baseAuthUrl + "/auth", baseAuthUrl + "/token")
                );
        new SwaggerContextService().withServletConfig(config).updateSwagger(swagger);

        DatasetManagerInstrumentedFilterContextListener.REGISTRY.register("Garbage Collection", new GarbageCollectorMetricSet());
        DatasetManagerInstrumentedFilterContextListener.REGISTRY.register("Buffers", new BufferPoolMetricSet(ManagementFactory.getPlatformMBeanServer()));
        DatasetManagerInstrumentedFilterContextListener.REGISTRY.register("Memory", new MemoryUsageGaugeSet());
        DatasetManagerInstrumentedFilterContextListener.REGISTRY.register("Threads", new ThreadStatesGaugeSet());
        DatasetManagerInstrumentedFilterContextListener.REGISTRY.register("File Descriptor", new FileDescriptorRatioGauge());
    }
}
