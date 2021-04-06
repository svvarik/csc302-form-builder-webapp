abstract class AbstractActor {
    private ID: string
    private Name: string;
    private DOB: Date;
    private Gender: Gender;
    private Phone: string;

    constructor(id: string, name: string, DOB: Date, Gender: Gender, Phone: string) {
        this.ID = id
        this.Name = name
        this.DOB = DOB
        this.Gender = Gender
        this.Phone = Phone
    }

    // Getter methods

    getID = () : string => {
        return this.ID
    }

    getName = () : string => {
        return this.Name
    }

    getDOB = () : Date => {
        return this.DOB
    }

    getGender = () : Gender => {
        return this.Gender
    }

    getPhone = () : String => {
        return this.Phone
    }

    // Setter methods

    setID = (id: string) => {
        this.ID = id
    }

    setName = (Name: string) => {
        this.Name = Name
    }

    setDOB = (DOB: Date) => {
        this.DOB = DOB
    }

    setGender = (Gender: Gender)  => {
        this.Gender = Gender
    }

    setPhone = (Phone: string) => {
        // validate phone number 
        const phoneRegex = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/
        if (Phone.match(phoneRegex)) { // phone number valid
            this.Phone = Phone
        } else { // phone number not valid
            alert("Please input a valid phone number.")
        }
    }

    abstract getJson = () => {;}
}

export default AbstractActor
export enum Gender {
    Female = "Female",
    Male = "Male",
    Other = "Other"
}
