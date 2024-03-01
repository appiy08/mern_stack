const express = require("express");
const {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutControllers");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// Require auth for all workout routes  
router.use(requireAuth)

// GET all workouts
router.get("/", getWorkouts);

// GET a single workout
router.get("/:id", getWorkout);

// POST a workout
router.post("/", createWorkout);

// DELETE a workout
router.delete("/:id", deleteWorkout);

// UPDATE a workout
router.patch("/:id", updateWorkout);

module.exports = router;
