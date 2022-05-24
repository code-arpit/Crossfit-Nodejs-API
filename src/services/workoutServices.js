//calling Workout.js from database file
const Workout = require("../database/Workout")
const { v4: uuid } = require("uuid")


const getAllWorkouts = () => {
    const allWorkouts = Workout.getAllWorkouts();
    return allWorkouts;
}

const getOneWorkout = (workoutId) => {
    const workout = Workout.getOneWorkout(workoutId)
    return workout;
}

const createNewWorkout = (newWorkout) => {
    console.log(newWorkout)
    const workoutToInsert = {
        ...newWorkout,
        id: uuid(),
        createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
        updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    }
    console.log(workoutToInsert)
    const createdWorkout = Workout.createNewWorkout(workoutToInsert);
    return createdWorkout;
}

const updateOneWorkout = (workoutId, changes) => {
    const updatedWorkout = Workout.updateOneWorkout(workoutId, changes);
    return updatedWorkout;
}

const deleteOneWorkout = (workoutId) => {
    Workout.deleteOneWorkout(workoutId);
    return;
}

module.exports = {
    getAllWorkouts,
    getOneWorkout,
    createNewWorkout,
    updateOneWorkout,
    deleteOneWorkout
}