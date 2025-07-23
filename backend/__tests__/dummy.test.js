const axios = require('axios');


test('adds 1 + 1 to equal 2', () => {
  expect(1 + 1).toBe(2);
});


test('Sign-Up should work in the backend' ,async () => {
    const randomNumber = Math.floor(Math.random() * 1000);
    const user = {
      username : 'user' + randomNumber,
      password : 'password' + randomNumber,
    }

    const response = await axios.post("http://localhost:8080/api/v1/signup", user);

    expect([201, 409]).toContain(response.status);
})