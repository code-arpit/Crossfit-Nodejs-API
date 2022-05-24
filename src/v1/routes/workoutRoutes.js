const express = require("express");
const workoutController = require("../../controllers/workoutController")

const router = express.Router();

router.get("/", workoutController.getAllWorkouts);

router.get("/:workoutId", workoutController.getOneWorkout)

router.post("/", workoutController.createOneWorkout)

router.patch("/:workoutId", workoutController.updateOneWorkout)

router.delete("/:workoutId", workoutController.deleteOneWorkout)

module.exports = router;