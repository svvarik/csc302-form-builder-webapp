// const formCollection = db.collection("forms")
// const sectionCollection = db.collection("sections")
// const fieldCollection = db.collection("fields")
import { json } from "body-parser";
import Form from "./classes/Form";

const formCollectionName = "forms"
const testFormColectionName = "testforms"

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
    const form =  await formCollection.find({"formID":formID}).sort({x: -1}).limit(1).toArray()
    return JSON.stringify(form)
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

export {getFormID, insertForm, getFormTemplates, getFormTemplateByID, updateForm, deleteForm}
