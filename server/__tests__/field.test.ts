import Field from "../src/classes/Field"

const text = "testName"
const id = "testID"
const type = "text"
const response = "123"

const field = new Field(text, id, type, response)

const simpleBuild = {
    "text": text,
    "fieldID": id,
    "type": type,
    "response": response
}

test('Test Field getID', () => {
    expect(field.getID()).toEqual(id);
});

test('Test Field getJson', () => {
    expect(field.getJson()).toEqual({
        "text": text,
        "fieldID": id,
        "type": type,
        "response": response,
        "enabled": true
    });
});

test('Test build form', () => {
    const newForm = Field.build(simpleBuild)
    expect(newForm).toBeInstanceOf(Field)
    expect(newForm.getJson()).toEqual({
        "text": text,
        "fieldID": id,
        "type": type,
        "response": response,
        "enabled": true
    });
});