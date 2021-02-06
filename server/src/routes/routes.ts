import * as express from "express";

export const register = (app: express.Application, db: any) => {

    // Collections
    const testCollection = db.collection("testCollection")

    /**
     * @swagger
     * /:
     *   get:
     *     summary: Retrieve Hello World
     *     description: Test if the homepage endpoint is working correctly
     */
    app.get("/", (req: any, res) => {
        res.send("Hello World!");
    });

    /**
     * @swagger
     * /read:
     *   get:
     *     summary: Retrieve all data under test collections
     *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
     */
    app.get('/read', (req, res) => {
        testCollection.find({}).toArray((err: any, result: any) => {
            res.send(result);
        })
    })

    /**
     * @swagger
     * /update:
     *   post:
     *     summary: Update testCollections with a new json
     *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
     */
    app.post('/update', (req, res) => {
        testCollection.insertOne(req.body).then((result: any) => {
            res.send(result);
        }).catch((err: any) => {
            throw err;
        });
    })
};