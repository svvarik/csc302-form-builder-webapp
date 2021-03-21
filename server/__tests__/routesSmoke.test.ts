import fetch from 'cross-fetch';

test('Test Hello World endpoint', async   () => {
  await expect(fetch('http://localhost:8080').then(response => response.text())).resolves.toBe('Hello World!');  
});

  test('Test create new form endpoint', async   () => {

    const data = {'title': 'testTitle', 'desc': 'testDescription', 'sections': [] as any[]}

    const response = (await fetch('http://localhost:8080/formTemplate?test=true',
    {method: 'POST',
    headers: {
        'Content-Type': 'application/json'
      },
    body: JSON.stringify(data)
    }))

    expect(response.status).toBe(200);
  });

  test('Test get all new forms endpoint', async   () => {

    const response = (await fetch('http://localhost:8080/formResponse/newForms',
    {method: 'GET',
    headers: {
        'Content-Type': 'application/json'
      },
    }))

    expect(response.status).toBe(200);
  });

  