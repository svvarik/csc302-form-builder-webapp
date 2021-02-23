"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Section_1 = __importDefault(require("./Section"));
const AbstractFormItem_1 = __importDefault(require("./AbstractFormItem"));
class Form extends AbstractFormItem_1.default {
    constructor(name, formID, sections = []) {
        super(formID);
        this.addSection = (section) => {
            this.sections.push(section);
        };
        this.getSections = () => {
            return this.sections;
        };
        this.getJson = () => {
            const jsonObj = {
                "name": this.name,
                "formID": this.getID(),
                "sections": this.sections.map((section) => {
                    return section.getJson();
                })
            };
            return jsonObj;
        };
        this.name = name;
        this.sections = sections;
    }
}
Form.build = (jsonObj) => {
    const sections = jsonObj.sections.map((section) => {
        return Section_1.default.build(section);
    });
    return new Form(jsonObj.name, jsonObj.formID, sections);
};
exports.default = Form;
//# sourceMappingURL=Form.js.map