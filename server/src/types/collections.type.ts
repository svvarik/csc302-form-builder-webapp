interface FormCollection {
    title: string,
    desc: string,
    formID: string,
    sections: SectionCollection[]
}

interface SectionCollection {
    title: string,
    sectionID: string,
    fields: FieldCollection[],
    sections: SectionCollection[]
}

interface FieldCollection {
    title: string,
    response: string,
    fieldID: string,
    type: string,
    options: string[],
    enabled: boolean
}

export {
    FormCollection,
    SectionCollection,
    FieldCollection
}