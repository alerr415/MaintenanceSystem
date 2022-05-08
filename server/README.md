# Server side API & Resources

## Error code convention
- 0 represents OK
- anything else is an error
- if the error code is 0, then errorMessage must be ignored

## Authenticate (POST /authenticate)
Used for login authentication of the users. The username and password should be enough to determine the role of the user. The role is the direct string representation of the database object.

### Request
- String username
- String password

### Response
- String role  
- String workerID
- String errorMessage  
- int errorCode  

## Add category (POST /category)
Used for category management (creating and organizing categories).
The qualificationID can be used to assign a specified qualification for the category.
CHANGE: the category now requires the qualification id.
The qualification ids can 
be queried with the GET /qualification resource and 
from that point the data can be cached.

### Request
- String categoryName
- int qualificationID
- String categoryPeriod
- String categoryNormalTime
- String specification
- String parent

### Response
- String errorMessage
- int errorCode

## Query categories (GET /category)
Used to get all the categories in a list.

### Request params
(None for now)

### Response
- \[String\] categories
- String resultMessage
- int resultCode

## Add device (POST /device)
Used for creating new devices.

### Request
- String deviceName
- String deviceCategoryName
- String deviceDescription
- String deviceLocation

### Response
- String errorMessage
- int errorCode

## Query devices (GET /device)

### Request
(none for now)

### Response
- String errorMessage
- int errorCode
- \[Device\]

### DeviceData
- int deviceID
- String deviceName
- String deviceCategoryName
- String deviceDescription
- String deviceLocation

## Add worker (POST /worker)
CHANGE: the worker requires the qualification id
for more consistent database.
The qualification ids can 
be queried with the GET /qualification resource and 
from that point the data can be cached.
CHANGE 2: it now requires a username and password

### Request
- String lastName
- String firstName
- String qualificationID
- String username
- String password

### Response
- String errorMessage
- int errorCode

## Query workers (GET /worker)
CHANGE: the WorkerData now contains the id of the 
worker's qualification. The qualification names can 
be queried with the GET /qualification resource and 
from that point the data can be cached.
NOTE: cache refresh response not implemented yet.
CHANGE: added workerID to WorkerData
CHANGE: can filter results by qualification id

### Request
Optional
- String qualificationID

### Response
- \[WorkerData\] data
- String errorMessage
- int errorCode

### WorkerData
- String workerID
- String lastName
- String firstName
- int qualificationID

## Add Qualification (POST /qualification)

### Request
- String qualificationName

### Response
- String errorMessage
- int errorCode

## Query Qualifications (GET /qualification)

### Request
(none for now)

### Response
- int resultCode
- String resultMessage
- \[QualifiactionData\] qualificationList

### QualificationData
- int qualificationID
- String qualificationName

## Add Maintenance task (POST /maintenance)
The basic stuff that is needed to initialize
a maintenance task. Might change later.

### Request
- int deviceID
- String taskName
- String specification
- String normTime

### Response
- String errorMessage
- int errorCode

## Query Maintenance tasks (GET /maintenance)
Maintenance data query method.

### Request
Optional, the worker id can query the tasks of the specified worker
- String workerID
Optional, shouldn't be used alongside workerID. This will query the 
non-assigned tasks with the specified qualification
- String qualificationID

### Response
- int errorCode
- String errorMessage
- \[MaintenanceData\] maintenanceList

### MaintenanceData
- int maintenanceTaskID
- int deviceID
- String deviceName
- String deviceLocation
- String maintenanceTaskName
- int state
- int workerID
- String startDate
- String finishDate
- String normTime
- String specification

## Set task state (POST /state)
The state should be the integer parsed into string format. 
Denial justification is only needed if the worker denies the task, otherwise
it can be null.

### Request
- String maintenanceID
- String state
- String denialJustification 

### Response
- int errorCode
- String errorMessage

## Assign task to worker (POST /assign)

### Request
- String maintenanceID
- String workerID

### Response
- int errorCode
- String errorMessage