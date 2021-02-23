"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Form_1 = __importDefault(require("../src/classes/Form"));
const name = "testName";
const id = "testID";
const sections = [];
const form = new Form_1.default(name, id, sections);
const simpleBuild = {
    "name": name,
    "formID": id,
    "sections": sections
};
test('Test Form getID', () => {
    expect(form.getID()).toEqual(id);
});
test('Test Form getJson', () => {
    expect(form.getJson()).toEqual(simpleBuild);
});
test('Test build form', () => {
    const newForm = Form_1.default.build(simpleBuild);
    expect(newForm).toBeInstanceOf(Form_1.default);
    expect(newForm.getJson()).toEqual(simpleBuild);
});
//# sourceMappingURL=form.test.js.map