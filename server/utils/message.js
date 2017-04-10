const moment = require('moment');

var generateMessage = (from, text) => {
    if (from && text) {
        return {from, text, createdAt: moment().valueOf()};
    } else {
        return null;
    }
};

var generateLocationMessage = (from, latitude, longitude) => {
    if (from && latitude && longitude) {

        return {
            from, 
            url: `https://www.google.com/maps?q=${latitude},${longitude}`,
            text: `${latitude},${longitude}`,
            createdAt: moment().valueOf()};
    } else {
        return null;
    }
};

module.exports = {generateMessage, generateLocationMessage};
