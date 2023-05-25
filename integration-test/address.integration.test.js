const request = require('supertest');
const appUrl = 'http://35.154.13.117'; 

test('Register a customer and verify updated customer list', async () => {
    // Register a new customer using the /register endpoint
    const registerResponse = await request(appUrl)
      .post('/register')
      .send({
              email:'test@gmail.com',
              firstName:'test',
              lastName:'test',
              password:'testpassword18',
              username:'testuser18'
            });
  
    expect(registerResponse.status).toBe(200);
    expect(registerResponse.body.id).toBeDefined();
  
   //setting cookie value
    let cookie_value = ''
    setCookieHeader=registerResponse.headers['set-cookie']
    if(setCookieHeader){
          const cookies = setCookieHeader.map((cookie) => cookie.split(';')[0]);
          for (let i = 0; i < cookies.length; i++) {
                  const cookie = cookies[i];
                  // chaecking if cookie includes logged_in value or not
                  if (cookie.includes('logged_in')) {
                          const cookieValue = cookie.split('=')[1];
                          // setting cookie value
                          cookie_value =  cookieValue;
                  break;
                  }
          }
    }

    const registeredUserId = registerResponse.body.id;


    // add address to the customer
   const addAddressResponse = await request(appUrl)
   .post('/addresses')
   .send({
    city: "asdv",
    country:"vasd",
    id:"646f4396ee11cb000163c3c9",
    number: "asdf",
    postcode: "avsd",
    street: "asd",
    custId:`${registeredUserId}`
   })
  .set('Cookie', `logged_in=${cookie_value}`);
  
   expect(addAddressResponse.status).toBe(200)
  
  
   const address = await request(appUrl)
   .get('/address')
   .query({custId:`${registeredUserId}`})
   .set('Cookie', `logged_in=${cookie_value}`);
  
  expect(address).toBeDefined();
  
  })
  
