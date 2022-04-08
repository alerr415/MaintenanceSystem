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
- String errorMessage  
- int errorCode  

## Add category (POST /category)
Used for category management (creating and organizing categories).
The qualificationID can be used to assign a specified qualification for the category.

### Request
- String categoryName
- String qualification
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
- String errorMessage
- int errorCode

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
- \[String\]

## Add worker (POST /worker)

### Request
- String lastName
- String firstName
- String qualification

### Response
- String errorMessage
- int errorCode

## Query workers (GET /worker)

### Request
(none for now)

### Response
- \[ Worker \]
- String errorMessage
- int errorCode

### Worker
- String lastName
- String firstName
- String qualification

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
- \[String\] qualificationList