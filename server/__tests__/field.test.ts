import Field from "../src/classes/Field"

const title = "testName"
const id = "testID"
const type = "text"
const response = "123"
const options: string[] = []

const field = new Field(title, id, type, response, options)

const simpleBuild = {
    "title": title,
    "fieldID": id,
    "type": type,
    "response": response,
    "options": options
}

test('Test Field getID', () => {
    expect(field.getID()).toEqual(id);
});

test('Test Field getJson', () => {
    expect(field.getJson()).toEqual({
        "title": title,
        "fieldID": id,
        "type": type,
        "response": response,
        "enabled": true,
        "options": options
    });
});

test('Test build form', () => {
    const newForm = Field.build(simpleBuild)
    expect(newForm).toBeInstanceOf(Field)
    expect(newForm.getJson()).toEqual({
        "title": title,
        "fieldID": id,
        "type": type,
        "response": response,
        "enabled": true,
        "options": options
    });
});