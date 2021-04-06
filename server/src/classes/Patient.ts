import AbstractActor from "./AbstractActor";
import {Gender} from "./AbstractActor";

class Patient extends AbstractActor {
    private Height: Number;
    private Weight: Number;
    private PatientHistory: null;

    constructor(id: string, name: string, DOB: Date, Gender: Gender, Phone: string, Height: Number, Weight: Number, PatientHistory: null) {
        super(id, name, DOB, Gender, Phone);
        this.Height = Height;
        this.Weight = Weight;
        this.PatientHistory = PatientHistory;
    }

    // Getter methods

    getHeight = () : Number => {
        return this.Height
    }

    getWeight = () : Number => {
        return this.Weight
    }

    getPatientHistory = () : null => {
        return this.PatientHistory
    }
    
    // Setter methods

    setHeight = (Height: Number) => {
        this.Height = Height
    }

    setWeight = (Weight: Number) => {
        this.Weight = Weight
    }

    setPatientHistory = (PatientHistory: null) => {
        this.PatientHistory = PatientHistory
    }

    getJson = () => {;}
}

export default Patient