import Section from "./Section";
import AbstractFormItem from "./AbstractFormItem";
import { FormCollection } from "../types/collections.type";

class Form extends AbstractFormItem {
    private name: string;
    private formID: string;
    private sections: Section[];

    constructor(name: string, formID?: string, sections: Section[] = []) {
        super(formID)
        this.name = name
        this.sections = sections;
    }

    static build = (jsonObj : any) : Form => {
        const sections = jsonObj.sections.map((section: any) => {
            return Section.build(section)
        });
        return new Form(jsonObj.name, jsonObj.formID, sections);
    }

    addSection = (section: Section) => {
        this.sections.push(section)
    }

    getSections = () : Section[] => {
        return this.sections
    }

    getJson = () : FormCollection => {
        const jsonObj = {
            "name": this.name,
            "formID": this.getID(),
            "sections": this.sections.map((section: Section) => {
                return section.getJson()
            })
        }
        return jsonObj
    }

}

export default Form