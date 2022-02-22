# ID-validator
A simple project that validates Egyptian national ID and extracts some useful information such as the date of birth, the gender, and the governorate where the ID owner was born.
# How to Install and Run the Project
Here are the steps to run the project on your machines:
1. Clone the project and open it in vs code.
2. Open a new terminal and write the following command to install node modules.
```
npm i
```
3. Write the following command to start running the project on server 8000.
```
node validator.js
```
Note: You need to install node first if you don't have it on your machine. You can install it from here: https://nodejs.org/en/download/

# How to Use the Project
To start the process of ID validation make a request to the following URL followed by your national ID, through your browser or postman or whatever you use to test.

http://localhost:8000/api/ids/ "Your national ID here". Example: http://localhost:8000/api/ids/43355881234234

# How the project is implemented:
First, a route to the IDs API is created using an express router. Then inside the IDs file, some javascript functions were created to validate and return the data when correct.
These functions are :
1. validateDateAllNumbers: checks that the national ID sent does not contain any characters and returns a boolean.
2. validate Date: checks that the entered century, year, month, and day in the ID are valid and returns the date when valid. The century is extracted then used to get the full year. After that the year, month, and day are concatenated and parsed to a javascript Date instance. If the date is correct then it is returned by the function. If the date parsed results in a NaN value, null is returned by the function.
3. validateGovernorate: checks and extracts the governorate name and code if the code inside the ID is valid. A JSON file containing the governorate code and the corresponding name is then created in the project directory and then imported to check the code extracted from the ID.

All of the above functions are used inside the get request implemented using the router. If any of the above functions return null or invalid values. A response with a status error of 400 and an error message is sent. Additionally, the length and the last digit of the ID are also checked. If all the values returned from the validation functions are correct, A JSON object containing the date of birth, governorate, and gender is sent in the response.  

