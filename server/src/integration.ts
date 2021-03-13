// const formCollection = db.collection("forms")
// const sectionCollection = db.collection("sections")
// const fieldCollection = db.collection("fields")
import Form from "./classes/Form";

const insertForm = async (form: Form, db: any) : Promise<number> => {
    const formCollection = db.collection("forms")

    try {
        await formCollection.insertOne(form.getJson())
        return 200;
    } catch (err: any) {
        return 401;
    }
}

const getFormID = () : string => {
    const formID = Date.now();
    return String(formID)
}

const updateForm = async (form: Form, formID: String, db: any) : Promise<number> => {
    const formCollection = db.collection("forms")

    try {
        await formCollection.update({"formID":formID}, form.getJson())
        return 200;
    } catch (err: any) {
        return 401;
    }
}

export {getFormID, insertForm, updateForm}