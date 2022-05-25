const recordService = require("../services/recordServices")

const getRecords = (req, res) => {
    workoutId = req.params["workoutId"]
    if (!workoutId) {
        res.status(422).send({
            status: "FAILED",
            data: "No workoutId was found. Please enter WokroutId"
        })
    }
    try {
        const record = recordService.getRecordForWorkout(workoutId)
        res.status(200).send({
            status: "SUCCESS",
            data: record
        })
    } catch (error) {
        res.status(error.status).send({
            status: "FAILED",
            data: error.message
        })
    }
}

module.exports = {
    getRecords
}