import Section from "./Section";
import AbstractFormItem from "./AbstractFormItem";
import { FormCollection } from "../types/collections.type";

class FormResponse extends AbstractFormItem {
    private desc: string;
    private sections: Section[];
    private procedureID: string;
    private patientID: string;

    constructor(title: string, desc: string, procedureID: string, patientID: string, formID?: string, sections: Section[] = []) {
        super(formID, title)
        this.desc = desc
        this.sections = sections;
        this.procedureID = procedureID
        this.patientID = patientID
    }

    static build = (jsonObj : any) : FormResponse => {
        const sections = jsonObj.sections.map((section: any) => {
            return Section.build(section)
        });
        return new FormResponse(jsonObj.title, jsonObj.desc, jsonObj.procedureID, jsonObj.patientID, jsonObj.formID, sections);
    }

    addSection = (section: Section) => {
        this.sections.push(section)
    }

    getSections = () : Section[] => {
        return this.sections
    }

    getProcedureId = () : string => {
        return this.procedureID
    }

    getPatientId = () : string => {
        return this.patientID
    }

    getJson = () : FormCollection => {
        const jsonObj = {
            "title": this.getTitle(),
            "desc": this.desc,
            "formID": this.getID(),
            "procedureID": this.getProcedureId(),
            "patientID": this.getProcedureId(),
            "sections": this.sections.map((section: Section) => {
                return section.getJson()
            })
        }
        return jsonObj
    }

}

export default FormResponse