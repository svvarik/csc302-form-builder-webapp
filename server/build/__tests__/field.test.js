"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Field_1 = __importDefault(require("../src/classes/Field"));
const text = "testName";
const id = "testID";
const type = "text";
const response = "123";
const field = new Field_1.default(text, id, type, response);
const simpleBuild = {
    "text": text,
    "fieldID": id,
    "type": type,
    "response": response
};
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
    const newForm = Field_1.default.build(simpleBuild);
    expect(newForm).toBeInstanceOf(Field_1.default);
    expect(newForm.getJson()).toEqual({
        "text": text,
        "fieldID": id,
        "type": type,
        "response": response,
        "enabled": true
    });
});
//# sourceMappingURL=field.test.js.map