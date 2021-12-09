const express = require("express")
const mongojs = require("mongojs")
const mongoose = require("mongoose");
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
const Workout = require('./models/workout.js');



// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//create database object
//db, and then the collection name 
// const db = mongojs("workout", ["workouts"]);

//connect 
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

//report if there is an error as soon as you start index.js
// db.on("error", error => {
//   console.log(`Database error: ${error}`)
// })

//GET ALL THE WORKOUTS 
app.get('/api/workouts', (req, res) => {
  Workout.findOne().sort({ day: -1 }).limit(1).exec((err, data) => {
  if (err) {
    console.log(err); 
  } else {
    res.json(data);
  }
})
})

//GET ALL THE WORKOUTS IN RANGE
app.get('/api/workouts/range', (req, res) => {

Workout.aggregate(
  [
      // Grouping pipeline
      { $addFields: { 
          totalDuration: { $sum: "$exercises.duration" }
      }},
      // Sorting pipeline
      { "$sort": { day: -1 } },
      // Optionally limit results
      { "$limit": 7 }
  ],
  function(err, data) {
    if (err) {
      console.log(err)
    } else {
      res.json(data)
    }
     // Result is an array of documents
  }
);
})

//INSERT A NEW RECORD
app.post('/api/workouts', (req, res) => {
  //can also use db.workouts.create for newer syntax
  Workout.create(req.body, (err, data) => {
  if (err) {
    console.log(err); 
  } else {
    console.log("CREATE DATA", data)
    res.json(data);
  }
})
})

//db.places.update({country: "Morocco"}, {$push: {majorcities: "Hong Kong" }})
//UPDATE AN EXISTING RECORD
app.put('/api/workouts/:id', (req, res) => {
  console.log()
  Workout.findOneAndUpdate({_id: req.params.id}, {$push: {exercises: req.body}}, {runValidators: true}, (err, data) => {
  if (err) {
    console.log(err); 
  } else {
    // console.log("data", data)
    res.json(data);
  }
})
})
//copied id: 61b01f835e5f2521ec2feafc
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