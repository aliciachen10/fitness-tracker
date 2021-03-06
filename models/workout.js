const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now
  },
  exercises: [{
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
  }
}]


});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
