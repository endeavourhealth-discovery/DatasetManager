# DatasetManager Project
![Version](https://s3.eu-west-2.amazonaws.com/endeavour-codebuild/badges/skeleton/version.svg)
![Build Status](https://s3.eu-west-2.amazonaws.com/endeavour-codebuild/badges/skeleton/build.svg)
![Unit Tests](https://s3.eu-west-2.amazonaws.com/endeavour-codebuild/badges/skeleton/unit-test.svg)

The DatasetManager maintains (CRUDs) the datasets (being used by extracts) in the DataGenerator project.

## API Information  
The project is setup as follows:

#### database  
Contains all the Java DB entities for the tables in the models folder and PersistenceManager which handles the connections to the DB.
 
#### endpoints  
Contains all the endpoints for the API.

#### logic
Contains the business logic for the application. This is where most of the code is held and should be unit tested.

#### framework
Contains standard exception classes and swagger bootstrap code. This is also where the Metrics are initialised on loading.

#### json
JSON representations of the DB entities to allow communication between frontend and backend.

#### Metrics 
Contains the standard implementations for the metrics code.

#### Running API
Create a run configuration in IntelliJ using Tomcat -> Local.
  
In the deployment tab, click + choose Artifact and select API:war exploded.

Change the application context field to /

In the startup tab, click on debug and add these options into the environment variables. 

CONFIG_JDBC_CLASS=com.mysql.jdbc.Driver
CONFIG_JDBC_URL=jdbc:mysql://localhost:3306/config?useSSL=false
CONFIG_JDBC_USERNAME=root
CONFIG_JDBC_PASSWORD=<password>

Click run and it should be up and running.

## Frontend Information
This is using Angular CLI so use this for creating any new components.  https://cli.angular.io/ for more information.

service.ts files are used to communicate with the API.

#### Running Frontend 
Create a run configuration in IntelliJ using npm
in the script input type start
Click run and it should start running on [http://localhost:4200](http://localhost:4200/)
