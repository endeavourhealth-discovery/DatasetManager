package org.endeavourhealth.datasetmanager.api.endpoints;
import com.codahale.metrics.annotation.Timed;
import io.astefanutti.metrics.aspectj.Metrics;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.endeavourhealth.datasetmanager.api.logic.DatasetManagerLogic;
import org.endeavourhealth.scheduler.models.database.DataSetEntity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import java.util.List;

@Path("/datasetManager") // TODO: endpoint path
@Metrics(registry = "datasetManagerMetricRegistry") // TODO: metrics registry
@Api(description = "Api for all calls relating to the Dataset Manager") // TODO: endpoint description
public class DatasetManagerEndpoint {

    private static final Logger LOG = LoggerFactory.getLogger(DatasetManagerEndpoint.class);

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Timed(absolute = true, name="DatasetManager.DatasetManagerEndpoint.Message.Get") // TODO: metrics name <application>.<endpoint>.<path>.<method>
    @Path("/message")
    @ApiOperation(value = "Returns a message") // TODO: operation description
    public Response get(@Context SecurityContext sc,
                        @ApiParam(value = "Mandatory name") @QueryParam("name") String name
    ) {

        String result = "Hello!"; // new DatasetManagerLogic().getMessage(name);

        return Response
            .ok(result)
            .build();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Timed(absolute = true, name="DatasetManager.DatasetManagerEndpoint.List.Get") // metrics name <application>.<endpoint>.<path>.<method>
    @Path("/list")
    @ApiOperation(value = "Returns a list of all datasets") // operation description
    public Response list(@Context SecurityContext sc) throws Exception {

        LOG.debug("List All Datasets Called");

        List<DataSetEntity> result = new DatasetManagerLogic().getAllDatasets();

        return Response
                .ok(result)
                .build();
    }
}
