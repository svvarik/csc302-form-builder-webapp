// const formCollection = db.collection("forms")
// const sectionCollection = db.collection("sections")
// const fieldCollection = db.collection("fields")
import { json } from "body-parser";
import Form from "./classes/Form";

const formCollectionName = "forms"
const testFormColectionName = "testforms"
const formResponses = 'formResponses'

const insertForm = async (form: Form, db: any, test=false) : Promise<string> => {

    const formCollection = test ? db.collection(testFormColectionName): db.collection(formCollectionName)

    try {
        await formCollection.insertOne(form.getJson())
        return form.getID();
    } catch (err: any) {
        return err.stack;
    }
}

const getFormID = () : string => {
    const formID = Date.now();
    return String(formID)
}

const getFormTemplates = async (db: any) : Promise<number> => {
    const formCollection = db.collection("forms")
    return formCollection.find().toArray()
}

const getFormTemplateByID = async (formID: string, db: any): Promise<string> => {
    const formCollection = db.collection("forms")
    // we only want to return one, the newest
    const form = await formCollection.findOne({$query: {"formID": formID}, $orderby: {$natural : -1}})
    return form
}

const updateForm = async (form: Form, formID: string, db: any, test=false) : Promise<number> => {
    const formCollection = test ? db.collection(testFormColectionName): db.collection(formCollectionName)

    var newForm = form.getJson()
    newForm.formID = formID

    try {
        await formCollection.update({"formID":formID}, newForm)
        return 200;
    } catch (err: any) {
        return 401;
    }
}

const deleteForm = async (formID: string, db: any, test=false): Promise<number> => {
    const formCollection = test ? db.collection(testFormColectionName): db.collection(formCollectionName)
    try {
        await formCollection.deleteOne({"formID":formID})
        return 200;
    } catch (err: any) {
        return 401;
    }
}

const getFormResponseById = async (formId: string, db: any): Promise<any> => {
    const forms = db.collection(formResponses)
    try {
        const formResponse =  await forms.findOne({"formID": formId})
        return formResponse
    } catch (err) {
        return err
    }
}

const getFormResponses = async (db: any): Promise<Array<any>> => {
    const forms = db.collection(formResponses)
    try {
        const responses =  await forms.find().toArray()
        return responses
    } catch (err) { 
        return err
    }
}

const saveFormResponse = async (db: any, formResponse: Form): Promise<number> => {
    const forms = db.collection(formResponses)
    try {
        const newForm = formResponse.getJson()
        const result = await forms.insertOne(newForm)
        if (result.insertedCount === 0) { 
            return 500;
        } else {
            return 200;
        }
    } catch (err: any) { 
        return err
    }
}

const updateFormResponse = async (formId: string, db: any, formResponse: Form): Promise<number> => {
    const forms = db.collection(formResponses)
    const options = {
        upsert: false,
      };

    try {
        const newForm = formResponse.getJson()
        const result =  await forms.replaceOne({"formID": formId}, newForm)

        if (result.modifiedCount === 0) {
            return 404;
        } else if (result.modifiedCount === 1){ 
            return 200;
        } else {
            return 400;
        }
    } catch (err) {
        return err
    }
}

export {getFormID, insertForm, getFormTemplates, getFormTemplateByID, updateForm, deleteForm, getFormResponseById, getFormResponses, saveFormResponse, updateFormResponse}
