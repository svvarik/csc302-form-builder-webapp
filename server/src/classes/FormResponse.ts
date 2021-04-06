import Section from "./Section";
import AbstractFormItem from "./AbstractFormItem";
import { FormCollection } from "../types/collections.type";

class FormResponse extends AbstractFormItem {
    private desc: string;
    private sections: Section[];
    private procedureId: string;
    private patientId: string;

    constructor(title: string, desc: string, procedureId: string, patientId: string, formID?: string, sections: Section[] = []) {
        super(formID, title)
        this.desc = desc
        this.sections = sections;
        this.procedureId = procedureId
        this.patientId = patientId
    }

    static build = (jsonObj : any) : FormResponse => {
        const sections = jsonObj.sections.map((section: any) => {
            return Section.build(section)
        });
        return new FormResponse(jsonObj.title, jsonObj.desc, jsonObj.procedureId, jsonObj.patientId, jsonObj.formID, sections);
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

    getPatientId = () : string => {
        return this.patientId
    }

    getJson = () : FormCollection => {
        const jsonObj = {
            "title": this.getTitle(),
            "desc": this.desc,
            "formID": this.getID(),
            "procedureId": this.getProcedureId(),
            "patientId": this.getProcedureId(),
            "sections": this.sections.map((section: Section) => {
                return section.getJson()
            })
        }
        return jsonObj
    }

}

export default FormResponse