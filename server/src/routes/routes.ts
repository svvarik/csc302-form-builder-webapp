import * as express from "express";
import * as integration from '../integration'
import Form from '../classes/Form'

export const register = (app: express.Application, db: any) => {

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
     * /save:
     *   post:
     *     summary: Save form body into database
     *     description: Given a JSON in requried format, read the json into Objects and save to database
     *     parameters:
     *       - name: Form
     *         description: A JSON representing a Form
     *         in: Form Body
     *         required: true
     *         type: JSON
     *     responses:
     *       200:
     *         description: All Good!
     */
    app.post('/save', async (req, res) => {
        const form = Form.build(req.body)
        const status = await integration.insertForm(form, db)
        res.sendStatus(status)
    })

    /**
     * @swagger
     * /newForm:
     *   get:
     *     summary: Get a new unique formID
     *     description: Generate a new unique form ID and return it
     */
    app.get('/newForm', (_, res) => {
        const formID = integration.getFormID();
        res.send(formID);
    })
};