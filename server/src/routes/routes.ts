import * as express from "express";
import * as integration from '../integration'
import Form from '../classes/Form'
import { body, validationResult } from 'express-validator'

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
    app.post('/save',
        body('formID').isString(),
        body('name').isString(),
        body('sections').isArray(),
        async (req: express.Request, res: express.Response) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            let form;
            try {
                form = Form.build(req.body)
                const status = await integration.insertForm(form, db)
                res.sendStatus(status)
            } catch (err) {
                return res.status(400).json(err.message);
            }
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

    /**
     * @swagger
     * /formTemplate/{formTemplateId}:
     *   patch:
     *     summary: Update existing form
     *     description: Given a JSON in requried format and a form id, read the json and form id and update the 
     *                  respective form with the new information
     *     responses:
     *       405:
     *         description: Validation exception
     *       200:
     *         description: Ok
     *       500:
     *         description: Server side error
     */
    app.patch('/formTemplate/:formTemplateId',
        async (req: express.Request, res: express.Response) => {
            var id = req.params.formTemplateId;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(405).json({ errors: errors.array() });
            }
            let form;
            try {
                form = Form.build(req.body)
                await integration.updateForm(form, id, db)
                res.sendStatus(200)

            } catch (err) {
                return res.status(500).json(err.message);
            }
        }) 

};