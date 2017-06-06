const expect = require('expect');

const {isRealString} = require('./validate');

const acceptableString = ' pineapples ';
const emptyString = '     ';
const nonString = 5;

describe('isRealString', () => {
  it('should return true for an acceptable string', () => {
    let aST = isRealString(acceptableString);
    expect(aST).toExist();
  });

  it("should return false for an empty string", () => {
    let eST = isRealString(emptyString);
    expect(eST).toNotExist();
  });

  it('should return false for a non string', () => {
    let nST = isRealString(nonString);
    expect(nST).toNotExist();
  })
});
