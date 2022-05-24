//adding controls for the api and calling the main function of the api from
//the workoutService file where services are introduced
const workoutService = require("../services/workoutServices")

const getAllWorkouts = (req, res) => {
    //calling the get all workout service from workoutServices file
    const allWorkouts = workoutService.getAllWorkouts();

    //in this variable we received the data in json format from the database
    //so now we have to send it to the forward
    res.send({ status: "OK", data: allWorkouts });

    // res.send("Get all Workouts.")
};

const getOneWorkout = (req, res) => {
    workoutId = req.params["workoutId"]
    console.log(req)
    console.log(workoutId)

    // calling the get one workout service from workoutServices file
    const workout = workoutService.getOneWorkout(workoutId);
    res.status(200).send({ status: 'OK', data: workout })
};

const createOneWorkout = (req, res) => {
    const { body } = req;
    console.log(body)
    if (!body.name ||
        !body.mode ||
        !body.equipment ||
        !body.exercises ||
        !body.trainerTips
    ) {
        console.log("Please enter all the workout details")
        res.status(422).send({ status: "FAIL", data: "Please Enter all the amounts" });
    }
    // creating a new varibale with all the entered details
    const newWorkout = {
        name: body.name,
        mode: body.mode,
        equipment: body.equipment,
        exercises: body.exercises,
        trainer: body.trainerTips,
    };
    console.log(newWorkout)
        // calling the create new workout service from workoutServices file
    const createdWorkout = workoutService.createNewWorkout(newWorkout);

    // sending response
    res.status(201).send({ status: "OK", data: createdWorkout });
};

const updateOneWorkout = (req, res) => {
    const {
        body,
        params: { workoutId },
    } = req;
    if (!workoutId) {
        res.status(422).send({ status: "FAIL", data: "Please enter a workout Id." })
    }

    // calling the update workout service from workoutServices file
    const updatedWorkout = workoutService.updateOneWorkout(workoutId, body);
    res.status(201).send({
        status: "OK",
        data: `Workout Successfully updated.`
    })
};

const deleteOneWorkout = (req, res) => {
    const {
        params: { workoutId }
    } = req;
    if (!workoutId) {
        res.status(422).send({
            status: "FAIL",
            data: "Please provide workoutID."
        })
    }

    // caliing the delete workout service from workoutService file
    workoutService.deleteOneWorkout(workoutId);
    res.status(201).send({ status: "OK", data: "Deleted workout successfully." })
};

module.exports = {
    getAllWorkouts,
    getOneWorkout,
    createOneWorkout,
    updateOneWorkout,
    deleteOneWorkout
};