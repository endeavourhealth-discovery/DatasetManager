package org.endeavourhealth.datasetmanager.api.endpoints;
import com.codahale.metrics.annotation.Timed;
import io.astefanutti.metrics.aspectj.Metrics;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.endeavourhealth.common.security.annotations.RequiresAdmin;
import org.endeavourhealth.datasetmanager.api.json.JsonDataset;
import org.endeavourhealth.datasetmanager.api.logic.DatasetManagerLogic;
import org.endeavourhealth.scheduler.models.database.DataSetEntity;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import java.util.List;

@Path("/datasetManager")
@Metrics(registry = "datasetManagerMetricRegistry")
@Api(description = "Api for all calls relating to the Dataset Manager")
public class DatasetManagerEndpoint {

    private static final Logger LOG = LoggerFactory.getLogger(DatasetManagerEndpoint.class);

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Timed(absolute = true, name="DatasetManager.DatasetManagerEndpoint.Message.Get")
    @Path("/message")
    @ApiOperation(value = "Returns a message")
    public Response get(@Context SecurityContext sc,
                        @ApiParam(value = "Mandatory name")
                        @QueryParam("name") String name) {

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

        LOG.debug("List all datasets called");

        List<DataSetEntity> result = new DatasetManagerLogic().getAllDatasets();

        return Response
                .ok(result)
                .build();
    }

    @DELETE
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Timed(absolute = true, name="DatasetManager.DatasetManagerEndpoint.Delete")
    @Path("/")
    @ApiOperation(value = "Delete a dataset based on the Id that is passed to the API. Deletion is PERMANENT!")

    public Response deleteDataset(@Context SecurityContext sc,
                                  @ApiParam(value = "Id of the dataset to be deleted")
                                  @QueryParam("id") String id) throws Exception {

        LOG.debug("Delete dataset called");

        new DatasetManagerLogic().deleteDataset(id);

        return Response
                .ok()
                .build();
    }


    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Timed(absolute = true, name="DatasetManager.DatasetManagerEndpoint.Dataset.Save.Post")
    @Path("/dataset/save")
    @RequiresAdmin
    @ApiOperation(value = "Saves a dataset or updates an existing dataset")
    public Response saveDataset(@Context SecurityContext sc, JsonDataset jsonDataset,
                                @ApiParam(value = "edit mode") @QueryParam("editMode") String editMode) throws Exception {

        LOG.debug("Save dataset called");

        boolean isEdit = editMode.equals("1");
        JSONObject definition = new JSONObject(jsonDataset.getDefinition());

        DataSetEntity dataset = new DataSetEntity();
        dataset.setDatasetId(jsonDataset.getDatasetId());
        dataset.setDefinition(definition.toString());

        dataset = new DatasetManagerLogic().saveDataset(dataset, isEdit);
        jsonDataset.setDatasetId(dataset.getDatasetId());

        return Response
                .ok()
                .entity(jsonDataset)
                .build();
    }

}