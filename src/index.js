//installing modules
const express = require("express")
const apicache = require("apicache")

const bodyParser = require("body-parser")
const v1workoutRouter = require("./v1/routes/workoutRoutes");

const { swaggerDocs: V1SwaggerDocs } = require("./v1/swagger");

const app = express()
const cache = apicache.middleware
const PORT = process.env.PORT || 3000;

// defining router form v1/router

// Base api
app.get('/', (req, res) => {
    res.send("<h2> It's working just fine. </h2>");
})

// Using url from v1/routes
app.use(bodyParser.json());
app.use(cache("2 minutes"));
app.use("/workouts", v1workoutRouter);



app.listen(PORT, () => {
    console.log(`"API on listening on port ${PORT}"`)
    V1SwaggerDocs(app, PORT)
})