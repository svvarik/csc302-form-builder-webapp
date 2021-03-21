import Section from "../src/classes/Section"

const title = "testName"
const id = "testID"
const sections: any[] = []
const fields: any[] = []

const section = new Section(title, id, fields, sections)

const simpleBuild = {
    "title": title,
    "sectionID": id,
    "sections": sections,
    "fields": fields
}

const complexBuild = {
    "title": title,
    "sectionID": id,
    "sections": [
        {
            "title": "testName2",
            "sectionID": "testID2",
            "sections": sections,
            "fields": fields
        },
        {
            "title": "testName3",
            "sectionID": "testID3",
            "sections": [
                {
                    "title": "testName4",
                    "sectionID": "testID4",
                    "sections": sections,
                    "fields": fields
                }
            ],
            "fields": fields
        }
    ],
    "fields": fields
}

test('Test Section getID', () => {
    expect(section.getID()).toEqual(id);
});

test('Test Section getJson', () => {
    expect(section.getJson()).toEqual({
        "title": title,
        "sectionID": id,
        "subSections": sections,
        "fields": fields
    });
});

test('Test simple build Section', () => {
    const newForm = Section.build(simpleBuild)
    expect(newForm).toBeInstanceOf(Section)
    expect(newForm.getJson()).toEqual({
        "title": title,
        "sectionID": id,
        "subSections": sections,
        "fields": fields
    });
});

test('Test complex build Section', () => {
    const newForm = Section.build(complexBuild)
    expect(newForm).toBeInstanceOf(Section)
    expect(newForm.getJson()).toEqual({
        "title": title,
        "sectionID": id,
        "subSections": [
            {
                "title": "testName2",
                "sectionID": "testID2",
                "subSections": sections,
                "fields": fields
            },
            {
                "title": "testName3",
                "sectionID": "testID3",
                "subSections": [
                    {
                        "title": "testName4",
                        "sectionID": "testID4",
                        "subSections": sections,
                        "fields": fields
                    }
                ],
                "fields": fields
            }
        ],
        "fields": fields
    });
});