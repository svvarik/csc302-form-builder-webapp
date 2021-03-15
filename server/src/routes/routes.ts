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
     * /formTemplate:
     *   post:
     *     summary: Creates new form template
     *     description: Given a JSON in requried format, read the json into Objects and make a new form
     *     parameters:
     *       - name: Form
     *         description: A JSON representing a Form
     *         in: Form Body
     *         required: true
     *         type: JSON
     *     responses:
     *       201:
     *         description: Form created
     *       500:
     *         description: Server side error
     */
    app.post('/formTemplate',
        body('name').isString(),
        body('sections').isArray(),
        async (req: express.Request, res: express.Response) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(500).json({ errors: errors.array() });
            }
            let form;
            try {
                const formID = integration.getFormID();
                req.body["formID"] = formID
                form = Form.build(req.body)
                await integration.insertForm(form, db)
                res.sendStatus(201)

            } catch (err) {
                return res.status(500).json(err.message);
            }

        })

    /**
     * @swagger
     * /formResponse/newForms:
     *   get:
     *     summary: Returns a list of all the possible empty form templates
     *     description: Generate a list of all possible empty form templates and return it 
     */
    app.get('/formResponse/newForms', (_, res) => {
        const formTemplates = integration.getFormTemplates(db);
        res.send(formTemplates);
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