const jwt = require('jsonwebtoken');

function createJWT() {
  const payload = {
    userId: 123,
    username: 'exampleUser'
  };
  const secretKey = 'yourSecretKey';

  const token = jwt.sign(payload, secretKey);

  console.log('JWT Token:', token);

  return token;
}

function verifyJWT(token) {
  const secretKey = 'yourSecretKey';

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      console.error('JWT Verification Failed:', err.message);
    } else {
      console.log('JWT Verified. Decoded:', decoded);
    }
  });
}

function decodeJWT(token) {
  const decoded = jwt.decode(token);

  console.log('Decoded JWT:', decoded);
}

const jwtToken = createJWT();

verifyJWT(jwtToken);

decodeJWT(jwtToken);
