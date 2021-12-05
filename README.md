# fitness-tracker

I've created a fitness tracker that allows the user to create and track daily workouts. A user can log multiple exercises in a workout on a given day, and can track the name, type, weight, sets, reps, and duration of exercise. If a user is tracking a cardio exercise, they can track distance as well. 

When the user loads the page, can either create a new workout or continue with their last workout and can do the following: 

  * Add exercises to the most recent workout plan.

  * Add new exercises to a new workout plan.

  * View the combined weight of multiple exercises from the past seven workouts on the `stats` page.

  * View the total duration of each workout from the past seven workouts on the `stats` page.

## accessing the application
The application is deployed via heroku and can be accessed here: INSERT HEROKU LINK
If you wanna be old school, you can ```git clone``` the application, install all packages using ```npm install``` (make sure you have mongodb installed on your machine). Now, run the application: ```node server.js``` or ```nodemon server.js```.

## what did I use to make this? 
I used HTML/CSS, Javascript, node.js and express.js for the backend, and MongoDB for the NoSQL database. 

## the application looks something like this: 
![image](https://github.com/aliciachen10/fitness-tracker/blob/main/demo.png)
