const expect = require('expect');

const{generateMessage} = require('./message')

describe('Generate message', () => {

it('should generate correct message object', () => {
  let from = 'User1';
  let text = 'I love you'
  let message = generateMessage(from, text);
  expect(message.from).toBe(from);
  expect(message.text).toBe(text);
  expect(message.createdAt).toBeA('number');
});
});
