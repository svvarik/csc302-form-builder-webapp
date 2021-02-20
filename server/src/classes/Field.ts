import { FieldCollection } from "../types/collections.type";
import AbstractFormItem from "./AbstractFormItem";

class Field extends AbstractFormItem {
    private text: string;
    private response: string;
    private enabled: boolean;
    private type: string;

    constructor(text: string, fieldID:string, type: string, response:string = "") {
        super(fieldID);
        this.text = text;
        this.type = type;
        this.response = response;
        this.enabled = true;
    }

    static build = (jsonObj: any) : Field => {
        return new Field(jsonObj.text, jsonObj.fieldID, jsonObj.type, jsonObj.response)
    };

    getJson = () : FieldCollection => {
        const jsonObj = {
            "text": this.text,
            "fieldID": this.getID(),
            "type": this.type,
            "response": this.response,
            "enabled": this.enabled,
        };
        return jsonObj;
    }

}

export default Field