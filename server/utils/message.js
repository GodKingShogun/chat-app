const moment = require('moment');

var date = moment();

var generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: date.valueOf()
  }
};

var generateLocationMessage = (from, lat, lon) => {
return {
  from,
  url: `https://google.com/maps?q=${lat},${lon}`,
  createdAt: date.valueOf()
}
};

module.exports = {generateMessage, generateLocationMessage};
