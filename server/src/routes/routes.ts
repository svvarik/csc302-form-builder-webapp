import * as express from "express";
import * as integration from '../integration'
import Form from '../classes/Form'
import FormResponse from '../classes/FormResponse'
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
        body('title').isString(),
        body('desc').isString(),
        body('sections').isArray(),
        async (req: express.Request, res: express.Response) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(500).json({ errors: errors.array() });
            }
            let form;
            try {
                const test = "test" in req.query && req.query.test ? true : false
                const formID = integration.getFormID();
                req.body.formID = formID
                form = Form.build(req.body)
                const dbResponse = await integration.insertForm(form, db, test)
                res.send(dbResponse)

            } catch (err) {
                return res.status(500).json(err.stack);
            }

        })

    /**
     * @swagger
     * /formResponse/newForms:
     *   get:
     *     summary: Returns a list of all the possible empty form templates
     *     description: Generate a list of all possible empty form templates and return it
     */
    app.get('/formTemplate/newForms', async (_, res) => {
        const formTemplates = await integration.getFormTemplates(db);
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
            const id = req.params.formTemplateId;
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


    /**
     * @swagger
     * /formTemplate/{formTemplateId}:
     *   get:
     *     summary: Returns a Form Template given a Form Template ID
     *     description: Given a Form Template ID returns the corresponding Form Template.
     *     responses:
     *       404:
     *         description: Form template not found
     *       405:
     *         description: Validation exception
     *       200:
     *         description: Most recent version of requested form template.
     *       500:
     *         description: Server side error
     */
    app.get('/formTemplate/:formTemplateId',
    async (req: express.Request, res: express.Response) => {
            const id = req.params.formTemplateId;
            const errors = validationResult(req);
            console.log(id, errors)
            if (!errors.isEmpty()) {
                return res.status(405).json({ errors: errors.array() });
            }
            try {
                console.log(id)
                const formTemplate = await integration.getFormTemplateByID(id, db);
                console.log(formTemplate)

                if (formTemplate === '{}') {
                    return res.status(404).json({errors: "Form Template not found"})

                } else {
                    res.status(200).json(formTemplate);
                }

            } catch (err) {
                return res.status(500).json(err.message);
            }

        })

    /**
     * @swagger
     * /formTemplate/{formTemplateId}:
     *   delete:
     *     summary: Delete existing form
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
    app.delete('/formTemplate/:formTemplateId',
        async (req: express.Request, res: express.Response) => {
            const id = req.params.formTemplateId;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(405).json({ errors: errors.array() });
            }
            try {
                const test = "test" in req.query && req.query.test ? true : false
                await integration.deleteForm(id, db, test)
                res.sendStatus(200)
            } catch (err) {
                return res.status(500).json(err.message);
            }
        })

    /**
     * @swagger
     * /formResponse
     */
     app.get('/formResponse/newForms', async (req: express.Request, res: express.Response) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(405).json({ errors: errors.array() });
        }
        try {
            const formResponses = await integration.getFormResponses(db)
            return res.status(200).json(formResponses)
        } catch (err) {
            return res.status(500).json(err.message);
        }
    })

    /**
     * @swagger
     * /formResponse/{formResponseId}:
     */
    app.get('/formResponse/:formResponseId', async (req: express.Request, res: express.Response) => {
        const id = req.params.formResponseId;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const formResponse = await integration.getFormResponseById(id, db)
            if (!formResponse) {
                return res.status(404).json({errors: "Form Response not found"})
            } else {
                return res.status(200).json(formResponse);
            }
        } catch (err) {
            return res.status(500).json(err.message);
        }
    })

    /**
     * @swagger
     * /formResponses
     */
    app.post('/formResponse', async (req: express.Request, res: express.Response) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array() })
        }
        try {
            const formResponseID = integration.getFormID();
            req.body.formID = formResponseID
            const formResponse = FormResponse.build(req.body)
            const result = await integration.saveFormResponse(db, formResponse)
            if (result === 200) {
                return res.status(200).json()
            } else {
                console.log(result)
                return res.status(500).json()
            }
        } catch (err) {
            return res.status(500).json(err.message);
        }
    })

    /**
     * @swagger
     * /formResponses/{formResponseId}
     */
     app.patch('/formResponse/:formResponseId', async (req: express.Request, res: express.Response) => {
        const id = req.params.formResponseId
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array() })
        }
        try {
            const formResponse = FormResponse.build(req.body)
            const result = await integration.updateFormResponse(id, db, formResponse)
            if (result === 400) {
                return res.status(400).json()
            } else if (result === 404) {
                return res.status(404).json()
            } else {
                return res.status(200).json()
            }
        } catch (err) {
            console.log(err)
            return res.status(500).json(err.message);
        }
    })

     /**
     * @swagger
     * /procedures
     */
      app.get('/procedures', async (req: express.Request, res: express.Response) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array() })
        }
        try {
            const result = await integration.getProcedures(db)
            return res.status(200).json(result)
        } catch (err) {
            return res.status(500).json(err.message);
        }
    })

    /**
     * @swagger
     * /procedures/{procedureId}
     */
     app.get('/procedures/:procedureId', async (req: express.Request, res: express.Response) => {
        const id = req.params.procedureId;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const procedure = await integration.getProcedureById(db, id)
            if (!procedure) {
                return res.status(404).json({errors: "Procedure not found"})
            } else {
                return res.status(200).json(procedure);
            }
        } catch (err) {
            return res.status(500).json(err.message);
        }
    })

    /**
     * @swagger
     * /procedures
     */
     app.post('/procedures', async (req: express.Request, res: express.Response) => {
        console.log(req.body)
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array() })
        }
        try {
            const newProcedure = req.body
            console.log(req.body)
            const result = await integration.addProcedure(db, newProcedure)
            if (result === 200) {
                return res.status(200).json()
            } else {
                return res.status(500).json()
            }
        } catch (err) {
            return res.status(500).json(err.message);
        }
    })
};