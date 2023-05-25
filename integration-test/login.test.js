const request = require('supertest');
const appUrl = 'http://13.234.35.248';

test('Login API', async () => {
  const response = await request(appUrl)
    .get('/login')
    .set('Authorization', 'Basic dGVzdHVzZXIwMDA5OnRlc3RwYXNzd29yZDAwMDk=') //base64 username:password
    .query({
      username: "testuser0009",
      password: "testpassword0009"
    })

  expect(response.status).toBe(200);
});
