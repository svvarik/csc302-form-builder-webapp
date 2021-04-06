import AbstractActor from "./AbstractActor";
import {Gender} from "./AbstractActor";

abstract class AbstractStaff extends AbstractActor {
    private FormReceiver: null;
    private FormEditor: null;
    private FormConfigEditor: null;

    constructor(id: string, name: string, DOB: Date, Gender: Gender, Phone: string, FormReceiver: null, FormEditor: null, FormConfigEditor: null) {
        super(id, name, DOB, Gender, Phone);
        this.FormReceiver = FormReceiver;
        this.FormEditor = FormEditor;
        this.FormConfigEditor = FormConfigEditor;
    }

    // Getter methods

    getFormReceiver = () : null => {
        return this.FormReceiver
    }

    getFormEditor = () : null => {
        return this.FormEditor
    }

    getFormConfigEditor = () : null => {
        return this.FormConfigEditor
    }
    
    // Setter methods

    setFormReceiver = (FormReceiver: null) => {
        this.FormReceiver = FormReceiver
    }

    setFormEditor = (FormEditor: null) => {
        this.FormEditor = FormEditor
    }

    setFormConfigEditor = (FormConfigEditor: null) => {
        this.FormConfigEditor = FormConfigEditor
    }

    abstract getJson = () => {;}
}

export default AbstractStaff