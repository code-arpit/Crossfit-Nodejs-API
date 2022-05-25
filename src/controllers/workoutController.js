//adding controls for the api and calling the main function of the api from
//the workoutService file where services are introduced
const workoutService = require("../services/workoutServices")

const getAllWorkouts = (req, res) => {
    // try {
    //     //calling the get all workout service from workoutServices file
    //     const allWorkouts = workoutService.getAllWorkouts();

    //     //in this variable we received the data in json format from the database
    //     //so now we have to send it to the forward
    //     res.send({ status: "OK", data: allWorkouts });
    // } catch (error) {
    //     res.status(error.status).send({
    //         status: "FAILED",
    //         data: {
    //             error: error.message
    //         }
    //     });
    // };
    const { mode } = req.query;
    try {
        const allWorkouts = workoutService.getAllWorkouts({ mode });
        res.send({
            status: "SUCCESS",
            data: allWorkouts
        })
    } catch (error) {
        res.send({
            status: error.status,
            message: error.message

        })
    }

};

const getOneWorkout = (req, res) => {
    workoutId = req.params["workoutId"]
    if (!workoutId) {
        res.status(400).send({
            status: "FAILED",
            data: {
                error: "Parameter Workout ID cannot be empty"
            }
        });

    }

    // calling the get one workout service from workoutServices file
    try {
        const workout = workoutService.getOneWorkout(workoutId);
        res.status(200).send({
            status: 'OK',
            data: workout
        })
    } catch (error) {
        res.status(error.status).send({
            status: "FAILED",
            data: error.message
        });
    }
};

const createOneWorkout = (req, res) => {
    const { body } = req;
    if (!body.name ||
        !body.mode ||
        !body.equipment ||
        !body.exercises ||
        !body.trainerTips
    ) {
        ("Please enter all the workout details")
        res.status(422).send({
            status: "FAILED",
            data: {
                error: "Please Enter all the values"
            }
        });
    }
    // creating a new varibale with all the entered details
    const newWorkout = {
        name: body.name,
        mode: body.mode,
        equipment: body.equipment,
        exercises: body.exercises,
        trainer: body.trainerTips,
    };
    try {
        // calling the create new workout service from workoutServices file
        const createdWorkout = workoutService.createNewWorkout(newWorkout);

        // sending response
        res.status(201).send({
            status: "OK",
            data: createdWorkout
        });
    } catch (error) {
        res.status(error.status).send({
            status: "FAILED",
            data: error.message
        });
    }
};

const updateOneWorkout = (req, res) => {
    const {
        body,
        params: { workoutId },
    } = req;
    if (!workoutId) {
        res.status(422).send({
            status: "FAILED",
            data: "Please enter a workout Id."
        })
    }
    try {
        // calling the update workout service from workoutServices file
        const updatedWorkout = workoutService.updateOneWorkout(workoutId, body);
        res.status(201).send({
            status: "OK",
            data: `Workout Successfully updated.`
        })
    } catch (error) {
        res.status(error.status).send({
            status: "FAILED",
            data: error.message
        })
    }
};

const deleteOneWorkout = (req, res) => {
    const {
        params: { workoutId }
    } = req;
    if (!workoutId) {
        res.status(422).send({
            status: "FAILED",
            data: "Please provide workoutID."
        })
    }

    try {
        // caliing the delete workout service from workoutService file
        workoutService.deleteOneWorkout(workoutId);
        res.status(201).send({
            status: "OK",
            data: "Deleted workout successfully."
        })
    } catch (error) {
        res.status(error.status).send({
            status: "FAILED",
            data: error.message
        })
    }

};

module.exports = {
    getAllWorkouts,
    getOneWorkout,
    createOneWorkout,
    updateOneWorkout,
    deleteOneWorkout
};