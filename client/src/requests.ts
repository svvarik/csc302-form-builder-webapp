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
export async function PublishForm(jsonString: string): Promise<Response> {
  const payload = jsonString

  const url = 'http://localhost:8080/formTemplate'
  const request = new Request(url, {
    method: 'post',
    body: payload,
    headers: {
      'Content-Type': 'application/json',
    },
  })
  try {
    const publishRequest = await fetch(request)
    return publishRequest
  } catch (err) {
    console.error(err)
    throw err
  }
}

export async function GetAllForms(): Promise<Response> {
  const url = 'http://localhost:8080/formResponse/newForms'
  const request = new Request(url, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  try {
    const getAllFormsRequest = await fetch(request)
    return getAllFormsRequest
  } catch (err) {
    console.error(err)
    throw err
  }
}

export async function HelloWorld() {
  const url = 'http://localhost:8080'
  const request = new Request(url, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
