const express = require("express");
const workoutController = require("../../controllers/workoutController")
const recordController = require("../../controllers/recordController")

const router = express.Router();

// CRUD in workouts
router.get("/", workoutController.getAllWorkouts);

router.get("/:workoutId", workoutController.getOneWorkout)

router.post("/", workoutController.createOneWorkout)

router.patch("/:workoutId", workoutController.updateOneWorkout)

router.delete("/:workoutId", workoutController.deleteOneWorkout)

// CRUD in records
router.get("/:workoutId/records", recordController.getRecords)


module.exports = router;