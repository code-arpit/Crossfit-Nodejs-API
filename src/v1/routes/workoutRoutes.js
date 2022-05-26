const express = require("express");
const apicache = require("apicache");

const workoutController = require("../../controllers/workoutController");
const recordController = require("../../controllers/recordController");

//Initiating router
const router = express.Router();

//Initiating middleware
const cache = apicache.middleware;

// CRUD in workouts
router.get("/", cache("2 minutes"), workoutController.getAllWorkouts);

router.get("/:workoutId", workoutController.getOneWorkout)

router.post("/", workoutController.createOneWorkout)

router.patch("/:workoutId", workoutController.updateOneWorkout)

router.delete("/:workoutId", workoutController.deleteOneWorkout)

// CRUD in records
router.get("/:workoutId/records", recordController.getRecords)


module.exports = router;