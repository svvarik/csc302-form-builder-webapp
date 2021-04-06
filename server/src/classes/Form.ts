import Section from "./Section";
import AbstractFormItem from "./AbstractFormItem";
import { FormCollection } from "../types/collections.type";

class Form extends AbstractFormItem {
    private desc: string;
    private sections: Section[];
    private procedureId: string;

    constructor(title: string, desc: string, procedureId: string, formID?: string, sections: Section[] = []) {
        super(formID, title)
        this.desc = desc
        this.sections = sections;
        this.procedureId = procedureId
    }

    static build = (jsonObj : any) : Form => {
        const sections = jsonObj.sections.map((section: any) => {
            return Section.build(section)
        });
        return new Form(jsonObj.title, jsonObj.desc, jsonObj.procedureId, jsonObj.formID, sections);
    }

    addSection = (section: Section) => {
        this.sections.push(section)
    }

    getSections = () : Section[] => {
        return this.sections
    }

    getProcedureId = () : string => {
        return this.procedureId
    }

    getJson = () : FormCollection => {
        const jsonObj = {
            "title": this.getTitle(),
            "desc": this.desc,
            "formID": this.getID(),
            "procedureId": this.getProcedureId(),
            "sections": this.sections.map((section: Section) => {
                return section.getJson()
            })
        }
        return jsonObj
    }

}

export default Form