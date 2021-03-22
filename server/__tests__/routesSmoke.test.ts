import fetch from 'cross-fetch';

test('Test Hello World endpoint', async () => {
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

    const response = (await fetch('http://localhost:8080/formResponse/newForms',
    {method: 'GET',
    headers: {
        'Content-Type': 'application/json'
      },
    }))

    expect(response.status).toBe(200);
  });

  