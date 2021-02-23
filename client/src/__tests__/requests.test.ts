import SaveRequest from '../requests'

describe('payload creation', () => {
  it('tests that payload is formatted correctly', async () => {
    const jsonString = JSON.stringify({
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
    const result = await SaveRequest(jsonString)
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

    console.log(expectedResult)
    expect(result).toBe(expectedResult)
  })
})
