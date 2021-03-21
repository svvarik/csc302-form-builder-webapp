abstract class AbstractFormItem {
    private ID: string
    private title: string;

    constructor(id: string, title: string) {
        this.ID = id
        this.title = title
    }

    getID = () : string => {
        return this.ID
    }

    getTitle = () : string => {
        return this.title
    }


    abstract getJson = () => {;}
}

export default AbstractFormItem