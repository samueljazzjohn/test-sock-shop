
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
            password:'testpassword35',
            username:'testuser35'
          });

  expect(registerResponse.status).toBe(200);
  expect(registerResponse.body.id).toBeDefined();

  // Retrieve the updated customer list using the /customers endpoint
  const customersResponse = await request(appUrl).get('/customers');

  expect(customersResponse.status).toBe(200);
  
  // parsing text data to json
  const customers = JSON.parse(customersResponse.text)['_embedded']
  expect(customers).toHaveProperty('customer');

const registeredCustomerId = registerResponse.body.id;
const customerList = customers.customer;

// Check if the registered customer is present in the customer list
const registeredCustomer = customerList.find(customer => customer.id === registeredCustomerId);
expect(registeredCustomer).toBeDefined();

});
