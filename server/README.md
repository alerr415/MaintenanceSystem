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

## Query categories (GET /category)
Used to get all the categories in a list.

### Request params
(None for now)

### Response
- \[String\] categories

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

## Device (POST /device)
Used for creating new devices.

### Request
- String deviceName
- String deviceCategoryName
- String deviceDescription
- String deviceLocation

### Response
- String errorMessage
- int errorCode
