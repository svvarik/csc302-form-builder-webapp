"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Section_1 = __importDefault(require("../src/classes/Section"));
const name = "testName";
const id = "testID";
const sections = [];
const fields = [];
const section = new Section_1.default(name, id, fields, sections);
const simpleBuild = {
    "name": name,
    "sectionID": id,
    "sections": sections,
    "fields": fields
};
const complexBuild = {
    "name": name,
    "sectionID": id,
    "sections": [
        {
            "name": "testName2",
            "sectionID": "testID2",
            "sections": sections,
            "fields": fields
        },
        {
            "name": "testName3",
            "sectionID": "testID3",
            "sections": [
                {
                    "name": "testName4",
                    "sectionID": "testID4",
                    "sections": sections,
                    "fields": fields
                }
            ],
            "fields": fields
        }
    ],
    "fields": fields
};
test('Test Section getID', () => {
    expect(section.getID()).toEqual(id);
});
test('Test Section getJson', () => {
    expect(section.getJson()).toEqual({
        "name": name,
        "sectionID": id,
        "subSections": sections,
        "fields": fields
    });
});
test('Test simple build Section', () => {
    const newForm = Section_1.default.build(simpleBuild);
    expect(newForm).toBeInstanceOf(Section_1.default);
    expect(newForm.getJson()).toEqual({
        "name": name,
        "sectionID": id,
        "subSections": sections,
        "fields": fields
    });
});
test('Test complex build Section', () => {
    const newForm = Section_1.default.build(complexBuild);
    expect(newForm).toBeInstanceOf(Section_1.default);
    expect(newForm.getJson()).toEqual({
        "name": name,
        "sectionID": id,
        "subSections": [
            {
                "name": "testName2",
                "sectionID": "testID2",
                "subSections": sections,
                "fields": fields
            },
            {
                "name": "testName3",
                "sectionID": "testID3",
                "subSections": [
                    {
                        "name": "testName4",
                        "sectionID": "testID4",
                        "subSections": sections,
                        "fields": fields
                    }
                ],
                "fields": fields
            }
        ],
        "fields": fields
    });
});
//# sourceMappingURL=section.test.js.map