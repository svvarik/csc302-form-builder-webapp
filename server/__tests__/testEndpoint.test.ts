import fetch from 'cross-fetch';

test('the data is Hello World!', async   () => {
  await expect(fetch('http://localhost:8080').then(response => response.text())).resolves.toBe('Hello World!');  
});
