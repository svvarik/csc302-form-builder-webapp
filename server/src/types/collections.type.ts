interface FormCollection {
    name: string,
    formID: string,
    sections: SectionCollection[]
}

interface SectionCollection {
    name: string,
    sectionID: string,
    fields: FieldCollection[],
    subSections: SectionCollection[]
}

interface FieldCollection {
    text: string,
    response: string,
    fieldID: string,
    type: string,
    enabled: boolean
}

export {
    FormCollection,
    SectionCollection,
    FieldCollection
}