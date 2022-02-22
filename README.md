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
