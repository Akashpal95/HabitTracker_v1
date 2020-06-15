# HabitTracker_v1
Simple habit tracker made using ExpressJS framework and MongoDB.
This application provides very basic functionalities like adding a habit, deleting a habit and record and update the status
of each habit for last 7 days.The application also allows you to store data user-wise allowing different users to sign-up and
track their habits.

# Libraries Required:
  "connect-mongo": "^3.2.0",
  "ejs": "^3.1.3",
  "express": "^4.17.1",
  "express-ejs-layouts": "^2.5.0",
  "express-session": "^1.17.1",
  "mongoose": "^5.9.18",
  "passport": "^0.4.1",
  "passport-local": "^1.0.0"
  This data is directly acquired from package.json.
  
# Project Structure:
  1. assets: contains all static files like css, js.<br>
  2. config: Contains configuration js for mongoose and passport<br>
  3. models: Contains db collection creation js for users and habits.<br>
  4. controllers: Contains all the controller functions which has all the end-point functions of routes.<br>
  5. Routes: Contains all routes.
  6. views: Contains all views.

# Project Setup:
 1. Download as zip and extract in your local system.
 2. Open folder in VS code.
 3. Open terminal and make the project folder as your current directory and run 'npm init'.
 4. Install all the libraries mentioned above(npm install library-name)
 5. To start the server, use command: npm start
 6. Go to https://localhost/8000 on your browser to use the application
 7. Voila!! You have your own habit tracker.
