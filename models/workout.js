const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//information about schema
// type
// name
// distance - number
// duration - number
// weight - number
// sets - number
// reps - number
const workoutSchema = new Schema({
  type: {
    type: String,
    trim: true,
    required: "Enter a workout type"
  },
  name: {
    type: String,
    trim: true,
    required: "Enter an exercise name"
  },
  distance: {
    type: Number,
  },
  duration: {
    type: Number,
  },
  weight: {
    type: Number,
  },
  sets: {
    type: Number,
  },
  reps: {
    type: Number,
  },
  // date: {
  //   type: Date,
  //   default: Date.now
  // }
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
