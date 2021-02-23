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
async function SaveRequest(jsonString: string) {
  const payload = jsonString

  const url = 'http://localhost:8080/save'
  const request = new Request(url, {
    method: 'post',
    body: payload,
    headers: {
      'Content-Type': 'application/json',
    },
  })
  try {
    const saveRequest = await fetch(request)
    return saveRequest
  } catch (err) {
    console.error(err)
  }
}

export default SaveRequest
