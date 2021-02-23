/**
 * The format of the SubSection
 */
interface SubSection {
  name: string
  sectionID: string
  sections: SubSection[]
  fields: Fields[]
}

/**
 * The format of a Field
 */
interface Fields {
  text: string
  response: string
  type: string
  fieldID: string
}

/**
 * @param formName The name of the form
 * @param id The id of the form
 * @param sectionsList The array holding all the various sections of the form
 *
 * @returns The string representation of the JSON payload
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
async function SaveRequest(
  formName: string,
  id: string,
  sectionsList: SubSection[]
) {
  const payload = {
    name: formName,
    formID: id,
    sections: sectionsList,
  }

  const url = 'http://localhost:8080/save'
  const request = new Request(url, {
    method: 'post',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  try {
    const saveRequest = await fetch(request)
      // eslint-disable-next-line consistent-return
      .then((res) => {
        if (res.status === 200) {
          return res.json()
        }
      })
      .catch((error) => {
        console.error(error)
      })
    return JSON.stringify(payload)
  } catch (err) {
    console.error(err)
  }
}

export default SaveRequest
