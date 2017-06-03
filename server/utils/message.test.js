const expect = require('expect');

const{generateMessage, generateLocationMessage} = require('./message')

describe('generateMessage', () => {

it('should generate correct message object', () => {
  let from = 'User1';
  let text = 'I love you'
  let message = generateMessage(from, text);
  expect(message.from).toBe(from);
  expect(message.text).toBe(text);
  expect(message.createdAt).toBeA('number');
});
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    let from = 'Admin';
    let lat = 1;
    let lon = 1;
    let url = 'https://google.com/maps?q=1,1';
    let location = generateLocationMessage(from, lat, lon);
    expect(location).toInclude({from,url});
    expect(location.createdAt).toBeA('number');
  });
});
