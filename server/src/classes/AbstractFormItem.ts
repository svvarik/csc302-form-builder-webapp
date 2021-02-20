abstract class AbstractFormItem {
    private ID: string

    constructor(id: string) {
        this.ID = id
    }

    getID = () : string => {
        return this.ID
    }

    abstract getJson = () => {;}
}

export default AbstractFormItem