// const formCollection = db.collection("forms")
// const sectionCollection = db.collection("sections")
// const fieldCollection = db.collection("fields")
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

const updateForm = async (form: Form, formID: String, db: any, test=false) : Promise<number> => {
    const formCollection = test ? db.collection(testFormColectionName): db.collection(formCollectionName)

    try {
        await formCollection.update({"formID":formID}, form.getJson())
        return 200;
    } catch (err: any) {
        return 401;
    }
}

const deleteForm = async (formID: String, db: any, test=false): Promise<number> => {
    const formCollection = test ? db.collection(testFormColectionName): db.collection(formCollectionName)
    try {
        await formCollection.deleteOne({"formID":formID})
        return 200;
    } catch (err: any) {
        return 401;
    }
}

export {getFormID, insertForm, getFormTemplates, updateForm, deleteForm}