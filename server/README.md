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

## Category (POST /category)
Used for category management (creating and organizing categories).
The qualificationID can be used to assign a specified qualification for the category.

### Request
- int categoryID
- int qualificationID
- String categoryName
- String categoryPeriod
- String categoryNormalTime
- String specification

### Response
- String errorMessage
- int errorCode

## Device
Used for creating new devices.

### Request
- int deviceID
- int deviceCategoryID
- String deviceName
- String deviceDescription
- String deviceLocation

### Response
- String errorMessage
- int errorCode

## Qualification
Used for qualification creation. 

### Request
- int qualificationID
- String qualificationName

### Response
- String errorMessage
- int errorCode