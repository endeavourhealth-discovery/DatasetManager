package org.endeavourhealth.datasetmanager.api.endpoints;
import com.codahale.metrics.annotation.Timed;
import io.astefanutti.metrics.aspectj.Metrics;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.endeavourhealth.datasetmanager.api.logic.DatasetManagerLogic;

import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;

@Path("/datasetManager") // TODO: endpoint path
@Metrics(registry = "datasetManagerMetricRegistry") // TODO: metrics registry
@Api(description = "Api for all calls relating to the Dataset Manager") // TODO: endpoint description
public class DatasetManagerEndpoint {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Timed(absolute = true, name="DatasetManager.DatasetManagerEndpoint.Message.Get") // TODO: metrics name <application>.<endpoint>.<path>.<method>
    @Path("/message")
    @ApiOperation(value = "Returns a list of all datasets") // TODO: operation description
    public Response get(@Context SecurityContext sc,
                        @ApiParam(value = "Mandatory name") @QueryParam("name") String name
    ) {
        System.out.println("Get Called");

        String result = new DatasetManagerLogic().getMessage(name);

        return Response
            .ok(result)
            .build();
    }
}
