const swaggerJsDoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")


//Basic Meta Information about our API
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Crossfit WOD API",
            version: "1.0.0"
        }
    },
    apis: ["./src/v1/routes/workoutRoutes.js"],
};

// Docs in JSON Format
const swaggerSpec = swaggerJsDoc(options);

//Function to setup out docs
const swaggerDocs = (app, port) => {
    //route handler to visit our docs
    app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    //maek our docs in Json format available
    app.get("/api/v1/docs.json", (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    })
    console.log(
        `Version 1 Docs are available on http://localhost:${port}/api/v1/docs`
    );
};

module.exports = { swaggerDocs }