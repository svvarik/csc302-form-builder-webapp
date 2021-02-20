import Form from "../src/classes/Form"

const name = "testName"
const id = "testID"
const sections: any[] = []

const form = new Form(name, id, sections)

const simpleBuild = {
    "name": name,
    "formID": id,
    "sections": sections
}

test('Test Form getID', () => {
    expect(form.getID()).toEqual(id);
});

test('Test Form getJson', () => {
    expect(form.getJson()).toEqual(simpleBuild);
});

test('Test build form', () => {
    const newForm = Form.build(simpleBuild)
    expect(newForm).toBeInstanceOf(Form)
    expect(newForm.getJson()).toEqual(simpleBuild);
});


