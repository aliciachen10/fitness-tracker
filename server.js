const express = require("express")
const mongojs = require("mongojs")
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//create database object
//db, and then the collection name 
const db = mongojs("workoutdb", ["workout"]);

//report if there is an error as soon as you start index.js
db.on("error", error => {
  console.log(`Database error: ${error}`)
})

//GET ALL THE WORKOUTS 
app.get('/api/workouts', (req, res) => {
  db.workout.find( (err, data) => {
  if (err) {
    console.log(err); 
  } else {
    res.json(data);
  }
})
})

//INSERT A NEW RECORD
app.post('/api/workouts', (req, res) => {
  db.workout.insert(req.body, (err, data) => {
  if (err) {
    console.log(err); 
  } else {
    res.json(data);
  }
})
})

//db.places.update({country: "Morocco"}, {$push: {majorcities: "Hong Kong" }})
//UPDATE AN EXISTING RECORD
app.put('/api/workouts/:id', (req, res) => {
  db.workout.update({id: req.params.id}, {$push: req.body}, (err, data) => {
  if (err) {
    console.log(err); 
  } else {
    res.json(data);
  }
})
})

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for exercise
app.get('/exercise', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/exercise.html'))
);

// GET Route for stats
app.get('/stats', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/stats.html'))
);

app.listen(PORT, () => {
  console.log(`App is listening on port: ${PORT}`)
})