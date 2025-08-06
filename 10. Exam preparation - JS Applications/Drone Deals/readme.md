JS Applications Exam Preparation 1 – Drone Deals

Guest navigation example: 

 
Home Page (10 pts)
Implement a static Home page for the app using the structure for it from the given resources. 
 

Login Page (5 pts)
The included REST service comes with the following premade user accounts, which you may use for development:
{ "email": "peter@abv.bg", "password": "123456" }
{ "email": "john@abv.bg", "password": "123456" }
The Login page contains a form for existing user authentication. By providing an email and password the app should log a user in the system if there are no empty fields.
 
Send the following request to perform login:
Method: POST
URL: /users/login
The required headers are described in the documentation. The service expects a body with the following shape:
{
  email,
  password
}
Upon success, the REST service will return the newly created object with an automatically generated _id and a property accessToken, which contains the session token for the user – you need to store this information using sessionStorage or localStorage, in order to be able to perform authenticated requests.
If the login was successful, redirect the user to the Home page. If there is an error, or the validations don’t pass, display an appropriate error message, using a system dialog (window.alert).
Register Page (10 pts)
When the user enters an email, a password and a password confirmation, the  app should register a new user in the system. All fields are required – if any of them is empty, or the password and repeat password doesn't match, display an error with text "Passwords don't match".
 
Send the following request to perform registration:
Method: POST
URL: /users/register
Required headers are described in the documentation. The service expects a body with the following shape:
{
  email,
  password
}
Upon success, the REST service will return the newly created object with an automatically generated _id and a property accessToken, which contains the session token for the user – you need to store this information using sessionStorage or localStorage, in order to be able to perform authenticated requests.
If the registration was successful, redirect the user to the Home page. If there is an error, or the validations don’t pass, display an appropriate error message, using a system dialog (window.alert).
Logout (5 pts)
The logout action is available to logged-in users. Send the following request to perform logout:
Method: GET 
URL: /users/logout
The required headers are described in the documentation. Upon success, the REST service will return an empty response. Clear any session information you’ve stored in browser storage.
If the logout was successful, redirect the user to the Home page.
Dashboard (15 pts)
This page displays a list of all Drones in the system. Clicking on the Details button in the Drone card leads to the details page for the selected drone. This page should be visible to guests and logged-in users.
 
If there are no Drones, the following view should be displayed:
 

Send the following request to read the list of records:
Method: GET
URL: /data/drones?sortBy=_createdOn%20desc
The required headers are described in the documentation. The service will return an array of Drone offers.
Adding a New Drone Offer(15 pts)
The Create page is available to logged-in users. It contains a form for adding a new drone offer. Check if all the fields are filled before you send the request.
 
To create item record, send the following request:
Method: POST
URL: /data/drones
The required headers are described in the documentation. The service expects a body with the following shape:
{
  model,
  imageUrl, 
  price, 
  condition,
  weight,
  phone,
  description
} 
The required headers are described in the documentation. The service will return the newly created record. Upon success, redirect the user to the Marketplace page.
Drone Details (10 pts)
All users should be able to view details about drone. Clicking the Details button in a drone offer should display the Details page. If the currently logged-in user is the creator, the Edit and Delete buttons should be displayed. Otherwise, they should not be available. The view should look like this to the creator of the drone record:
 
The view for guests and registered users who have not created the drone record should look like:
 
Send the following request to read a single item:
Method: GET
URL: /data/drones/:id
Where :id is the ID of the desired drone. The required headers are described in the documentation. The service will return a single object.
Editing a Drone Record (15 pts)
The Edit page is available to logged-in users and it allows authors to edit their own drone records. Clicking the Edit link of a particular item on the Details page should display the Edit page, with all fields filled with the data for the item. It contains a form with input fields for all relevant properties. Check if all the fields are filled before you send the request. 
  
To edit a drone record, send the following request:
Method: PUT
URL: /data/drones/:id
Where :id is the id of the desired itemd.
The service expects a body with the following shape:
{
  model,
  imageUrl, 
  price, 
  condition,
  weight,
  phone,
  description
} 
Required headers are described in the documentation. The service will return the modified record. Note that PUT requests do not merge properties and will instead replace the entire record. Upon success, redirect the user to the Details page for the current item.
Delete a Item Record (10 pts)
The delete action is available to logged-in users, for drone records they have created. When the author clicks on the Delete action on any of their drone offers, a confirmation dialog should be displayed, and upon confirming this dialog, the record should be deleted from the system.
To delete drone record, send the following request:
Method: DELETE
URL: /data/drones/:id
where :id is the id of the desired item. Required headers are described in the documentation. The service will return an object, containing the deletion time. Upon success, redirect the user to the Marketplace page.
BONUS: Notifications (15 pts)
In case of error caused by the user’s actions, the application should display an error notification message instead of an alert, which disappears after 3 seconds. There is a styled section with id "notifications" and styled div with id="errorBox" that has CSS property display initially set to none in the provided HTML file.
Errors may include validation errors or error messages returned by the REST service, such as incorrect user credentials, on the following pages: Register, Login, Create and Edit.
The tests are made to catch both window.alert and error notification message, you should only use one way to display errors! 
 
 
4.	Subtmitting Your Solution
Place in a ZIP file your project folder. Exclude the node_modules and images folder. Upload the archive to Judge.
 
              
It will take several minutes for Judge to process your solution!

5.	Appendix A: Using the Local REST Service
Starting the Service
The REST service will be in a folder named “server” inside the provided resources archive. It has no dependencies and can be started by opening a terminal in its directory and executing:
node server.js
If everything is initialized correctly, you should see a message about the host address and port on which the service will respond to requests.
Sending Requests
To send a request, use the hostname and port, shown in the initialization log and resource address and method as described in the application requirements. If data needs to be included in the request, it must be JSON-encoded, and the appropriate Content-Type header must be added. Similarly, if the service is to return data, it will be JSON-encoded. Note that some requests do not return a body and attempting to parse them will throw an exception.
Read requests, as well as login and register requests do not require authentication. All other requests must be authenticated.
Required Headers
To send data to the server, include a Content-Type header and encode the body as a JSON-string:
Content-Type: application/json
{JSON-encoded request body as described in the application requirements}
To perform an authenticated request, include an X-Authorization header, set to the value of the session token, returned by an earlier login or register request:
X-Authorization: {session token}
Server Response
Data response:
HTTP/1.1 200 OK
Access-Contrl-Allow-Origin: *
Content-Type: application/json
{JSON-encoded response data}
Empty response:
HTTP/1.1 204 No Content
Access-Contrl-Allow-Origin: *
Error response:
HTTP/1.1 400 Request Error
Access-Contrl-Allow-Origin: *
Content-Type: application/json
{JSON-encoded error message}
More Information
You can find more details on the GitHub repository of the service.
6.	Appendix B: Running the Test Suite
Project Setup
The tests require a web server to deliver the content of the application. There is a development web server included in the project scaffold, but you may use whatever server you are familiar with. Note that specialized tools like BrowserSync may interfere with the tests. To initialize the project with its dependencies, open a terminal in the folder, containing the file package.json and execute the following:
npm install
Note that if you changed the section devDependencies of the project, the tests may not initialize properly.
 
Executing the Tests
Before running the test suite, ensure that the web server is operational, that the local REST Service is stopped, and that the application can be found at the root of its network address. To start the included dev-server, open a terminal in the folder containing package.json and execute:
npm run start
This is a one-time operation unless you terminate the server at any point. It can be restarted with the same command as above.
To execute the tests, open a new terminal (do not close the terminal, running the web server instance) in the folder containing package.json and execute:
npm run test
 
Test results will be displayed in the terminal, along with detailed information about encountered problems. You can perform this operation as many times as it is necessary by re-running the above command.
Debugging Your Solution
If a test fails, you can view detailed information about the requirements that were not met by your application. Open the file e2e.test.js in the folder tests and navigate to the desired section as described below.
This first step will not be necessary if you are using the included web server. Make sure the application host is set correctly:
 
The value for host must be the address where your application is being served. Make sure that entering this address in a regular internet browser shows your application.
To make just a single test run, instead of the full suite (useful when debugging a single failing test), find the test and append .only after the it reference:
 
On slower machines, some of the tests may require more time to complete. You can instruct the tests to run more slowly by slightly increasing the values for interval and timeout:
 
Note that interval values greater than 600 and timeout values greater than 10000 are not recommended.
If this doesn’t make the test pass, set the value of DEBUG to true and run the tests again – this will launch a browser instance and allow you to see what is being tested, what the test sees and where it fails (or hangs):
 
If the actions are happening too fast, you can increase the value of slowMo. If the browser hangs, you can just close it and abort any remaining tests by focusing the terminal window and pressing [Ctrl+C] followed by the letter "y" and [Enter].
The final thing to look for is the exact row where the test fails:
 

