const mongoose = require("mongoose");
const {size} = require("lodash");
const workoutModel = require("../models/workoutModel");

// Get all workouts
const getWorkouts = async (req, res) => {
  try {
    const workouts = await workoutModel.find({}).sort({ createdAt: -1 });
    res.status(200).json({
      status: 200,
      message: "Workouts data get successfully!",
      data: workouts,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message,
      data: null,
    });
  }
};

// Get a single workout
const getWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      status: 404,
      message: "No such workout found",
      data: null,
    });
  }
  try {
    const workout = await workoutModel.findById(id);
    if (!workout) {
      return res.status(404).json({
        status: 404,
        message: "No such workout found",
        data: null,
      });
    } else {
      return res.status(200).json({
        status: 200,
        message: "Workout data get successfully!",
        data: workout,
      });
    }
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message,
      data: null,
    });
  }
};

// Create a new workout
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;

  const emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!load) {
    emptyFields.push("load");
  }
  if (!reps) {
    emptyFields.push("reps");
  }
  if (size(emptyFields)>0) {
    return res
      .status(400)
      .json({ error: "Please fill all the fields", emptyFields });
  }

  try {
    const workout = await workoutModel.create({ title, load, reps });
    res.status(200).json({
      status: 200,
      message: "Workout data created successfully!",
      data: workout,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message,
      data: null,
    });
  }
};

// Delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      status: 404,
      message: "No such workout found",
      data: null,
    });
  }
  try {
    const workout = await workoutModel.findOneAndDelete({ _id: id });
    if (!workout) {
      return res.status(404).json({
        status: 404,
        message: "No such workout found",
        data: null,
      });
    } else {
      return res.status(200).json({
        status: 200,
        message: "Workout data deleted successfully!",
        data: workout,
      });
    }
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message,
      data: null,
    });
  }
};

// Update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      status: 404,
      message: "No such workout found",
      data: null,
    });
  }
  try {
    const workout = await workoutModel.findByIdAndUpdate(
      { _id: id },
      { ...req.body }
    );
    if (!workout) {
      return res.status(404).json({
        status: 404,
        message: "No such workout found",
        data: null,
      });
    } else {
      return res.status(200).json({
        status: 200,
        message: "Workout data updated successfully!",
        data: workout,
      });
    }
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message,
      data: null,
    });
  }
};

module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
};
