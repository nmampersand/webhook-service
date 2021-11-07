'use strict';

const badRequest = (message = 'Bad Request') => ({
  statusCode: 400,
  body: JSON.stringify({ message }),
  headers: {
    'content-type': 'application/json'
  }
})

const okRequest = (message = 'OK') => ({
  statusCode: 200,
  body: JSON.stringify({ message }),
  headers: {
    'content-type': 'application/json'
  }
})

module.exports = {
  badRequest,
  okRequest
}