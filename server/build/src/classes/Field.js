"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractFormItem_1 = __importDefault(require("./AbstractFormItem"));
class Field extends AbstractFormItem_1.default {
    constructor(text, fieldID, type, response = "") {
        super(fieldID);
        this.getJson = () => {
            const jsonObj = {
                "text": this.text,
                "fieldID": this.getID(),
                "type": this.type,
                "response": this.response,
                "enabled": this.enabled,
            };
            return jsonObj;
        };
        this.text = text;
        this.type = type;
        this.response = response;
        this.enabled = true;
    }
}
Field.build = (jsonObj) => {
    return new Field(jsonObj.text, jsonObj.fieldID, jsonObj.type, jsonObj.response);
};
exports.default = Field;
//# sourceMappingURL=Field.js.map