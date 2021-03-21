import Section from "./Section";
import AbstractFormItem from "./AbstractFormItem";
import { FormCollection } from "../types/collections.type";

class Form extends AbstractFormItem {
    private desc: string;
    private sections: Section[];

    constructor(title: string, desc: string, formID?: string, sections: Section[] = []) {
        super(formID, title)
        this.desc = desc
        this.sections = sections;
    }

    static build = (jsonObj : any) : Form => {
        const sections = jsonObj.sections.map((section: any) => {
            return Section.build(section)
        });
        return new Form(jsonObj.title, jsonObj.desc, jsonObj.formID, sections);
    }

    addSection = (section: Section) => {
        this.sections.push(section)
    }

    getSections = () : Section[] => {
        return this.sections
    }

    getJson = () : FormCollection => {
        const jsonObj = {
            "title": this.getTitle(),
            "desc": this.desc,
            "formID": this.getID(),
            "sections": this.sections.map((section: Section) => {
                return section.getJson()
            })
        }
        return jsonObj
    }

}

export default Form