const DB = require("./db.json");
const savetoDatabase = require("./utils");
const saveToDatabase = require("./utils")

const getAllWorkouts = (filterParams) => {
    console.log(filterParams)
    try {
        let workouts = DB.workouts;
        console.log(workouts)
        if (filterParams.mode) {
            results = workouts.filter((workout) =>
                workout.mode.toLowerCase().includes(filterParams.mode)
            )
        }
        console.log(results)
        return results;
    } catch (error) {
        throw {
            status: 500,
            message: error
        }
    }
};

const getOneWorkout = (workoutId) => {
    try {
        const workout = DB.workouts.find((workout) => workout.id === workoutId);
        if (!workout) {
            throw {
                status: 422,
                message: "Requested workout not found!. Please check your workoutId."
            }
        }
        return workout;
    } catch (error) {
        throw ({
            status: error.status,
            message: error.message
        })
    }
}

const createNewWorkout = (newWorkout) => {
    const isAlreadyAdded =
        DB.workouts.findIndex((workout) => workout.name === newWorkout.name) > -1;
    if (isAlreadyAdded) {
        throw {
            status: 400,
            message: `Workout with name "${newWorkout.name}" already exists.`
        }
    }
    try {
        DB.workouts.push(newWorkout);
        savetoDatabase(DB)
        return newWorkout
    } catch (error) {
        throw {
            status: error.status || 500,
            message: error.message || error
        };
    }
}

const updateOneWorkout = (workoutId, changes) => {
    try {
        const indexForUpdate = DB.workouts.findIndex(
            (workout) => workout.id === workoutId
        );
        if (indexForUpdate === -1) {
            throw {
                status: 400,
                message: "Workout with this ID Does not exists. Please check your workout Id."
            }
        }
        const updatedWorkout = {
            ...DB.workouts[indexForUpdate],
            ...changes,
            updatedAt: new Date().toLocaleString("en-US", { timezone: "UTC" }),
        };
        DB.workouts[indexForUpdate] = updatedWorkout;
        saveToDatabase(DB);
        return updatedWorkout;
    } catch (error) {
        throw {
            status: error.status,
            message: error.message
        }
    }
}

const deleteOneWorkout = (workoutId) => {
    try {
        const indexForDeletion = DB.workouts.findIndex(
            (workout) => workout.id = workoutId
        );
        if (indexForDeletion === -1) {
            throw {
                status: 404,
                message: "Cannot find workout wiht the given ID. Please check your workout Id."
            }
        }
        DB.workouts.splice(indexForDeletion, 1);
        saveToDatabase(DB)
    } catch (error) {
        throw {
            status: error.status || 500,
            message: error.message || error
        }
    }
};

module.exports = {
    getAllWorkouts,
    getOneWorkout,
    createNewWorkout,
    updateOneWorkout,
    deleteOneWorkout
};