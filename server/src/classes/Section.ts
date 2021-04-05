import Field from "./Field";
import AbstractFormItem from "./AbstractFormItem";
import { SectionCollection } from "../types/collections.type";

class Section extends AbstractFormItem {
    private fields: Field[];
    private subSections: Section[];

    constructor(title: string, sectionID:string, fields: Field[] = [], subSections: Section[] = []) {
        super(sectionID, title)
        this.fields = fields;
        this.subSections = subSections;
    }

    static build = (jsonObj: any) : Section => {
        const fields = jsonObj.fields.map((field: any) => {
            return Field.build(field)
        });
        const subSections = jsonObj.sections.map((subSection: any) => {
            return Section.build(subSection)
        });
        return new Section(jsonObj.title, jsonObj.sectionID, fields, subSections)
    }

    getFields = () : Field[] => {
        return this.fields
    }

    getJson = () : SectionCollection => {
        const jsonObj = {
            "title": this.getTitle(),
            "sectionID": this.getID(),
            "sections": this.subSections.map((section: Section) => {
                return section.getJson()
            }),
            "fields": this.fields.map((field: Field)=> {
                return field.getJson()
            })
        };
        return jsonObj;
    }

}

export default Section