"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Field_1 = __importDefault(require("./Field"));
const AbstractFormItem_1 = __importDefault(require("./AbstractFormItem"));
class Section extends AbstractFormItem_1.default {
    constructor(name, sectionID, fields = [], subSections = []) {
        super(sectionID);
        this.getFields = () => {
            return this.fields;
        };
        this.getJson = () => {
            const jsonObj = {
                "name": this.name,
                "sectionID": this.getID(),
                "subSections": this.subSections.map((section) => {
                    return section.getJson();
                }),
                "fields": this.fields.map((field) => {
                    return field.getJson();
                })
            };
            return jsonObj;
        };
        this.name = name;
        this.fields = fields;
        this.subSections = subSections;
    }
}
Section.build = (jsonObj) => {
    const fields = jsonObj.fields.map((field) => {
        return Field_1.default.build(field);
    });
    const subSections = jsonObj.sections.map((subSection) => {
        return Section.build(subSection);
    });
    return new Section(jsonObj.name, jsonObj.sectionID, fields, subSections);
};
exports.default = Section;
//# sourceMappingURL=Section.js.map