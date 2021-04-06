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

/**
 * @param jsonString The json representation of the form
 * @param id The id of the form
 * @returns The status
 */
export async function UpdateForm(
  jsonString: string,
  formID: string
): Promise<Response> {
  const payload = jsonString

  const url = `http://localhost:8080/formTemplate/${formID}`
  const request = new Request(url, {
    method: 'PATCH',
    body: payload,
    headers: {
      'Content-Type': 'application/json',
    },
  })
  try {
    const updateRequest = await fetch(url, {
      method: 'PATCH',
      body: payload,
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return updateRequest
  } catch (err) {
    console.error(err)
    throw err
  }
}

export async function GetAllForms(): Promise<Response> {
  const url = 'http://localhost:8080/formTemplate/newForms'
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

export async function DeleteForm(id: string): Promise<Response> {
  const url = `http://localhost:8080/formTemplate/${id}`
  const request = new Request(url, {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  try {
    const deleteFormRequest = await fetch(request)
    return deleteFormRequest
  } catch (err) {
    console.error(err)
    throw err
  }
}

export async function GetFormTemplate(id: string): Promise<Response> {
  const url = `http://localhost:8080/formTemplate/${id}`
  const request = new Request(url, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  try {
    const getFormRequest = await fetch(request)
    return getFormRequest
  } catch (err) {
    console.error(err)
    throw err
  }
}

export async function GetAllFormResponses(): Promise<Response> {
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

export async function GetFormResponse(id: string): Promise<Response> {
  const url = `http://localhost:8080/formResponse/${id}`
  const request = new Request(url, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  try {
    const getFormResponse = await fetch(request)
    return getFormResponse
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
