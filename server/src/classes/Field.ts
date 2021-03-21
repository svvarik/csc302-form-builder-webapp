import { FieldCollection } from "../types/collections.type";
import AbstractFormItem from "./AbstractFormItem";

class Field extends AbstractFormItem {
    private response: string;
    private enabled: boolean;
    private type: string;
    private options: string[];

    constructor(title: string, fieldID:string, type: string, response:string = "", options: string[]) {
        super(fieldID, title);
        this.type = type;
        this.response = response;
        this.enabled = true;
        this.options = options
    }

    static build = (jsonObj: any) : Field => {
        return new Field(jsonObj.title, jsonObj.fieldID, jsonObj.type, jsonObj.response, jsonObj.options)
    };

    getJson = () : FieldCollection => {
        const jsonObj = {
            "title": this.getTitle(),
            "fieldID": this.getID(),
            "type": this.type,
            "response": this.response,
            "enabled": this.enabled,
            "options": this.options
        };
        return jsonObj;
    }

}

export default Field