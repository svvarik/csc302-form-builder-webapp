import fetch from 'cross-fetch';

test('Test Hello World endpoint', async   () => {
  await expect(fetch('http://localhost:8080').then(response => response.text())).resolves.toBe('Hello World!');  
});

  test('Test create new form endpoint', async   () => {

    const data = {'name': 'HI','sections': [] as any[]}

    const response = (await fetch('http://localhost:8080/formTemplate',
    {method: 'POST',
    headers: {
        'Content-Type': 'application/json'
      },
    body: JSON.stringify(data)
    }))


    expect(response.status).toBe(201);
  });

  