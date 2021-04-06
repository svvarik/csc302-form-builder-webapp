import fetch from 'cross-fetch';

test('Test Hello World endpoint', async   () => {
  await expect(fetch('http://localhost:8080').then(response => response.text())).resolves.toBe('Hello World!');
});

  test('Test create new form endpoint', async () => {

    const data1 = {'title': 'testTitle', 'desc': 'testDescription', 'sections': [] as any[]}

    const response1 = (await fetch(
      'http://localhost:8080/formTemplate?test=true',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data1)
      }
    ))

    expect(response1.status).toBe(200);

    const data2 = {'title': 'testTitle', 'sections': [] as any[]}

    const response2 = (await fetch(
      'http://localhost:8080/formTemplate?test=true',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data2)
      }
    ))

    // data2 form missing description, therefore response should be 500
    expect(response2.status).toBe(500);

  });

  test('Test get all new forms endpoint', async () => {

    const response = (await fetch('http://localhost:8080/formTemplate/newForms',
    {method: 'GET',
    headers: {
        'Content-Type': 'application/json'
      },
    }))

    expect(response.status).toBe(200);
  });

  test('Test create new form then get by id then delete endpoint', async () => {

    const data1 = {'title': 'testTitle', 'desc': 'testDescription', 'sections': [] as any[]}

    const response1 = (await fetch(
      'http://localhost:8080/formTemplate?test=true',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data1)
      }
    ))

    expect(response1.status).toBe(200);

    const id = response1.body

    const response = (await fetch('http://localhost:8080/formTemplate/${id}?test=true',
    {method: 'GET',
    headers: {
        'Content-Type': 'application/json'
      },
    }))

    expect(response.status).toBe(200);

    const response2 = (await fetch(
      `http://localhost:8080/formTemplate/${id}?test=true`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      }
    ))

    // data2 form missing description, therefore response should be 500
    expect(response2.status).toBe(200);

  });

test('Test get all form responses endpoint', async () => {

  const response = (await fetch('http://localhost:8080/formResponse/newForms',
  {method: 'GET',
  headers: {
      'Content-Type': 'application/json'
    },
  }))

  expect(response.status).toBe(200);
});

test('Test create form response', async () => {

  const form = {'title': 'testTitle', 'patientId': '123456', 'procedureId': '1234', 'sections': [] as any[]}

  const response = (await fetch('http://localhost:8080/formResponse',
  {method: 'POST',
  headers: {
      'Content-Type': 'application/json'
    },
  body: JSON.stringify(form),
  }))

  expect(response.status).toBe(200);

});

test('Test create form response', async () => {

  const form1 = {'title': 'testTitle1', 'procedureId': '123456', 'sections': [] as any[]}
  const form2 = {'title': 'testTitle2', 'procedureId': '123456', 'sections': [] as any[]}
  const form3 = {'title': 'testTitle3', 'procedureId': '123456', 'sections': [] as any[]}

  const response = (await fetch('http://localhost:8080/formResponse',
  {method: 'POST',
  headers: {
      'Content-Type': 'application/json'
    },
  body: JSON.stringify(form1),
  }))

  const response2 = (await fetch('http://localhost:8080/formResponse',
  {method: 'POST',
  headers: {
      'Content-Type': 'application/json'
    },
  body: JSON.stringify(form2),
  }))

  const response3 = (await fetch('http://localhost:8080/formResponse',
  {method: 'POST',
  headers: {
      'Content-Type': 'application/json'
    },
  body: JSON.stringify(form3),
  }))

  expect(response.status).toBe(200);
  expect(response2.status).toBe(200);
  expect(response3.status).toBe(200);

  const array = (await fetch('http://localhost:8080/formResponse/newForms',
  {method: 'GET',
  headers: {
      'Content-Type': 'application/json'
    },
  }))

  const allForms = await array.json()
  console.log(allForms)
  expect(array.status).toBe(200)
});

test('Test create procedure and check that it exists in the db', async () => {

  const form1 = {'procedure': 'TestProcedure','id': '123456'}

  const response = (await fetch('http://localhost:8080/procedures',
  {method: 'POST',
  headers: {
      'Content-Type': 'application/json'
    },
  body: JSON.stringify(form1),
  }))

  expect(response.status).toBe(200);

  const array = (await fetch('http://localhost:8080/procedures',
  {method: 'GET',
  headers: {
      'Content-Type': 'application/json'
    },
  }))

  const exists = false
  const allProcedures = await array.json()
  console.log(allProcedures)
  let found = false
  allProcedures.forEach((element: any) => {
    if(element.id = '123456') {
      found=true
    }
  });

  expect(found).toBe(true)
  expect(typeof(allProcedures)).toBe("object")
});