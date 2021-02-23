import express from "express";
import dotenv from "dotenv";
import * as routes from "./routes/routes";
import bodyParser from "body-parser";
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from '../swagger.json'
import morgan from "morgan";
import MongoClient from 'mongodb';


dotenv.config();
const app = express();

const cors = require('cors');
app.use(cors())

// port to listen
const port = process.env.SERVER_PORT;

// Define swagger options
const options = {
    swaggerDefinition: swaggerDocument,
    // Paths to files containing OpenAPI definitions
    apis: ['../server/**/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

// Connect to MongoDB
MongoClient.connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}, (err: any, db: any) => {
    if (err) {
        // tslint:disable-next-line:no-console
        console.log("If you error here, you may have to register you IP for the MongoDB")
        // tslint:disable-next-line:no-console
        return console.log(err)
    }
    // tslint:disable-next-line:no-console
    console.log(`connected to database`);
    const client = db.db("SDCDB")

    // App usages of imported libraries
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.use(morgan("tiny"));

    // Configure routes
    routes.register(app, client);

    // start the Express server
    app.listen(port, () => {
        // tslint:disable-next-line:no-console
        console.log(`server started at http://localhost:${port}`);
    });

});