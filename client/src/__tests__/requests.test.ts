import SaveRequest from '../requests'

describe('payload creation', () => {
  it('tests that payload is formatted correctly', async () => {
    const name = 'COVID FORM'
    const formId = 'a'
    const sections = [
      {
        name: 'Blood Tests',
        sectionID: '1',
        sections: [],
        fields: [
          {
            text: 'Blood Level',
            response: '50',
            type: 'integer',
            fieldID: 'a1a',
          },
          {
            text: 'Blood Type',
            response: 'AB',
            type: 'Multiple',
            fieldID: 'a1b',
          },
        ],
      },
    ]
    const result = SaveRequest(name, formId, sections)
    const expectedResult = JSON.stringify({
      name: 'COVID FORM',
      formID: 'a',
      sections: [
        {
          name: 'Blood Tests',
          sectionID: '1',
          sections: [],
          fields: [
            {
              text: 'Blood Level',
              response: '50',
              type: 'integer',
              fieldID: 'a1a',
            },
            {
              text: 'Blood Type',
              response: 'AB',
              type: 'Multiple',
              fieldID: 'a1b',
            },
          ],
        },
      ],
    })
    expect(result).toBe(expectedResult)
  })
})
