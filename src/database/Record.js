const DB = require("./db.json")

const getRecordForWorkout = (workoutId) => {
    try {
        const record = DB.records.filter((record) => record.workout === workoutId)
        if (record.length === 0) {
            throw {
                status: 404,
                message: `No record was found for the workoutId "${workoutId}"`
            };
        }
        return record
    } catch (error) {
        throw {
            status: error.status || 500,
            message: error.message || error
        }
    }
}

module.exports = {
    getRecordForWorkout
}